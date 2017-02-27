'use strict';

const Hapi        = require('hapi');
const BasicAuth   = require('hapi-auth-basic');
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const env         = process.env.NODE_ENV || 'development';
const config      = require(__dirname + '/config/config')[env];
const models      = require('./models');
const Pack        = require('./package');
const server      = new Hapi.Server();
const Bcrypt = require('bcrypt');


const options = {
  info: {
    'title': 'Test API Documentation',
    'version': Pack.version,
  }
};

server.connection({ port: 8081 });
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
    console.log('Running on 8081');
  });
});

var users = {
  future: {
    id: '1',
    username: 'future',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG'  // 'studio'
  }
}

var basicValidation  = function (request, username, password, callback) {
  var user = users[ username ]

  if (!user) {
    return callback(null, false)
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
    callback(err, isValid, { id: user.id, username: user.username })
  })
}

server.route({
  method: 'GET',
  path: '/private-route',
  config: {
    auth: 'simple',
    handler: function (request, reply) {
      reply('Yeah! This message is only available for authenticated users!')
    }
  }
})