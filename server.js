'use strict';

const Hapi      = require('hapi');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config')[env];
const models    = require('./models');
const server = new Hapi.Server();

server.connection({ port: 3000 });
server.route(require('./lib/routes/user'));
server.route(require('./lib/routes/project'));
server.route(require('./lib/routes/credit'));
server.route(require('./lib/routes/redemption'));
server.route(require('./lib/routes/work-session'));
server.route(require('./lib/routes/credit-transaction'));

models.sequelize.sync().then(function() {
  server.start(function() {
    console.log('Running on 3000');
  });
});
