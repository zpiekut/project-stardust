'use strict';

const Hapi        = require('hapi');
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const env         = process.env.NODE_ENV || 'development';
const config      = require(__dirname + '/config/config')[env];
const models      = require('./models');
const Pack        = require('./package');
const server      = new Hapi.Server();

const options = {
  info: {
    'title': 'Test API Documentation',
    'version': Pack.version,
  }
};

server.connection({ port: 3000 });
server.route(require('./lib/routes/user'));
server.route(require('./lib/routes/project'));
server.route(require('./lib/routes/credit'));
server.route(require('./lib/routes/redemption'));
server.route(require('./lib/routes/work-session'));
server.route(require('./lib/routes/credit-transaction'));

server.register([ Inert, Vision, {
  'register': HapiSwagger,
  'options': options
}]);

models.sequelize.sync().then(function() {
  server.start(function() {
    console.log('Running on 3000');
  });
});
