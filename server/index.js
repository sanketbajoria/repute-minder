const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const freshDesk = require('./freshDesk');
var schedule = require('node-schedule');
var proxyMiddleware = require('http-proxy-middleware');
const reddit = require('./social/reddit');
const sentiment = require('./sentiment');
var db = require('./database');

app.use(express.static(__dirname + '/../build'));

app.use(bodyParser.json());

app.post('/api/v1/login', (req, res, next) => {
  try {
    db.getUser({ email: req.body.email }).then((user) => {
      // console.log(user, user.password);
      if (user != null && user.password === req.body.password) {
        res.status(200).json(user).end();
      } else {
        res.status(403).end();
      }
    }, (err) => {
      console.log(err);
      res.status(400).end();
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

app.get('/api/v1/users/freshdesk', (req, res, next) => {
  try {
    db.getUser({ email: req.query.email }).then((user) => {
      // console.log(user, user.password);
      if (user != null) {
        delete user.password;
        res.status(200).json(user).end();
      } else {
        res.status(403).end();
      }
    }, (err) => {
      console.log(err);
      res.status(400).end();
    });
  }catch (e) {
    console.log(e);
    next(e);
  }
});

app.post('/api/v1/users', (req, res, next) => {
  try {
    if(req.body.name && req.body.email && req.body.password){
      db.getUser({ email: req.body.email }).then((u) => {
        if(!u){
          db.createUser(req.body).then((user) => {
            res.json(user);
          }, (err) => {
            console.log(err);
            res.status(400).end();
          });
        }else{
          res.status(400).end();
        }
      })
    }else{
      res.status(400).end();
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
    next(e);
  }
});

app.put('/api/v1/users/freshdesk', (req, res, next) => {
  try {
    if(req.body.email && req.body.freshdesk){
      db.getUser({ email: req.body.email }).then((u) => {
        if(u){
          //validate
          var f = JSON.parse(req.body.freshdesk);
          if(!u.freshdesk){
            freshDesk.isExists(f.company.name, f.agent.email).then((exists) => {
              if(exists[0] || exists[1]){
                res.status(400).send("Company with this name already registered");
              }else if(exists[2] || exists[3]){
                res.status(400).send("Agent Email Id already taken");
              }else{
                freshDesk.createCompany(f.company).then(com => {
                  return freshDesk.createGroup(f.company).then(gr => {
                    return freshDesk.createAdminAgent(f.agent.name, f.agent.email, gr.id, com.id).then(ag => {
                      return {agentId: ag.id, groupId: gr.id, companyId: com.id};
                    });
                  })
                }).then((result) => {
                  u.freshdesk = JSON.stringify(Object.assign(f, result));
                  db.updateUser(u).then((user) => {
                    res.json(user);
                  }, (err) => {
                    console.log(err);
                    res.status(400).send("Server side error");
                  });
                }).catch((err) => {
                  res.status(400).send(err.message);
                })
              }
            });
          }else{
            var uf = JSON.parse(u.freshdesk);
            uf.keywords = f.keywords;
            uf.reddit = f.reddit;
            uf.negativity = f.negativity;
            uf.upvotes = f.upvotes;
            uf.viewCounts = f.viewCounts;
            u.freshdesk = JSON.stringify(uf);
            db.updateUser(u).then((user) => {
              res.json(user);
            }, (err) => {
              console.log(err);
              res.status(400).send("Server side error");
            });
          }
        }else{
          res.status(403).end();
        }
      })
    }else{
      res.status(400).end();
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
    next(e);
  }
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))

var j = schedule.scheduleJob('*/1 * * * *', function(){
  console.log('Every minute - ' +  new Date().getTime());
  db.findAllUser().then(users => {
    return users.filter(u => u.freshdesk != null).map(u => JSON.parse(u.freshdesk));
  }).then(feeds => {
    console.log(feeds);
    feeds.forEach(f => {
      if(f.reddit){
        var keywords = f.keywords.filter(k => k);
        reddit.search(keywords).then(s => {
          console.log(s);
          return s.forEach(feed => {
            if(feed.ups >= f.upvotes && feed.view_count >= f.viewCounts){
            console.log("sentiment analysis");
            var result = sentiment.analyze(feed.title);
            if((result.score * -10) >= f.negativity){
              console.log("finding ticket in db");
              db.getTicket(feed.id).then(t => {
                if(!t){
                  //Raise a ticket 
                  console.log("Raising ticket in freshdesk");
                  console.log({group_id: f.groupId, priority: 1, status: 2, responder_id: f.agentId, requester_id: f.agentId,subject: "Provide support to reddit user", description: redditDescription(feed)}); 
                      
                  freshDesk.createTicket({group_id: f.groupId, priority: 1, status: 2, responder_id: f.agentId, requester_id: f.agentId,subject: "Provide support to reddit user", description: redditDescription(feed)}).then((t) => {
                    db.createTicket({feedId: feed.id, ticketId: t.id});
                    console.log("Raised a ticket");
                  }).catch((err) => {
                    console.log(err);
                    console.log("error raising ticket - " + err.message)
                  })
                }
              })
            }
            }
          })
        });
      }
    })
  })

});

function redditDescription(feed){
  return `<h3>${feed.title}</h3><p>${feed.url}</p>`
}