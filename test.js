const freshDesk = require('./server/freshDesk');
const sentiment = require('./server/sentiment');
const reddit = require('./server/social/reddit');
/* 
reddit.search(["#uniquewear"]).then(s => {
    return console.log(s)
}); */

/* freshDesk.isExists("Dummy Company", 'sanketbajoria12@gmail.com').then((exists) => {
    console.log(exists);
}); */

/* freshDesk.onboardCompany({name: "Dummy Company", description: "testing"}, {name: "Sanket", email: "sanketbajoria12@gmail.com"}).catch((err) => {
    console.log(err + err.message)
})  */

/* console.log(sentiment.analyze("Not happy with a service. Product is really bad. Color fade after two wash"));
//console.log(sentiment.analyze("Really cool service. They have deliver on time. And, quality of produc is good"));
console.log(sentiment.analyze("Unhappy with #uniquewear services. After multiple complains still got no response from them")); */


freshDesk.cleanUp().then(() => {
    console.log("af");
}).catch((err) => {
    console.log(err);
});
/* 
freshDesk.createTicket({ group_id: 43000089574,
    /* company_id: 43000089292, 
    priority: 1,
    status: 2,
    responder_id: 43001533203,
    requester_id: 43001533203,
    subject: 'Provide support to reddit user',
    description: '<h3>Unhappy with #uniquewear services. After multiple complains still got no response from them.</h3><p>https://www.reddit.com/r/Instagram/comments/8tgix8/unhappy_with_uniquewear_services_after_multiple/</p>'}).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err);
    }) */

/* const sql = require('mssql')
 
const config = {
    user: 'RelayApi',
    password: '0i6X2Z5W',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'PIOfficeMail',
    port: 2433,
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    } 
}

async function init() {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            //.input('input_parameter', sql.Int, value)
            .query('select top 1 * from Job')
            
        console.dir(result1);
		pool.close();
 
    } catch (err) {
        console.log("Error occured - " + err);
    }
};

init();
 
sql.on('error', err => {
    console.log("Error occured - " + err);
}) */