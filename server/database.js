const Sequelize = require('sequelize');
var Op = Sequelize.Op;
var fs = require('fs');
var dir = './database';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const sequelize = new Sequelize('database', 'pbappstore', 'PB@PP$TORE', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database/database.sqlite'
});

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    freshdesk: {
        type: Sequelize.JSON
    }
});
const Ticket = sequelize.define('ticket', {
    feedId: {
        type: Sequelize.STRING
    },
    ticketId: {
        type: Sequelize.STRING
    }
});
User.sync();
Ticket.sync();

module.exports = {
    createUser: function (user) {
        return User.sync().then(() => {
            return User.create(user);
        });
    },
    getUser: function (email) {
        console.log(email);
        return User.findOne({
            where: email
        });
    },
    findAllUser: function(){
        return User.findAll();
    },
    updateUser: function(u){
        return User.update({freshdesk: u.freshdesk}, {where: {id: u.id}});
    },
    createTicket: function(ticket){
        return Ticket.sync().then(() => {
            return Ticket.create(ticket);
        })
    },
    getTicket: function(feedId){
        return Ticket.findOne({
            where: {feedId: feedId}
        })
    }

};