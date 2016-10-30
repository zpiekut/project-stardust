'use strict';

const Hapi      = require('hapi');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config')[env];
const models    = require('./models');
const server = new Hapi.Server();

server.connection({ port: 3000 });
server.route(require('./lib/routes'));

models.sequelize.sync().then(function() {
  server.start(function() {
    console.log('Running on 3000');
  });
});
