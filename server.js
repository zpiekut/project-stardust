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

server.connection({ port: 8081 });
server.route(require('./lib/routes/user'));
server.route(require('./lib/routes/project'));
server.route(require('./lib/routes/credit'));
server.route(require('./lib/routes/redemption'));
server.route(require('./lib/routes/work-session'));
server.route(require('./lib/routes/credit-transaction'));

var users = { // collect users from db
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};

//fill this out
var validate = function (decoded, request, callback) {

  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

server.register(require('hapi-auth-jwt2'), function (err) {

  if(err){
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt',
      { key: 'NeverShareYourSecret',          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });

  server.auth.default('jwt');

  server.route([
    {
      method: "GET", path: "/", config: { auth: false },
      handler: function(request, reply) {
        reply({text: 'Token not required'});
      }
    },
    {
      method: 'GET', path: '/restricted', config: { auth: 'jwt' },
      handler: function(request, reply) {
        reply({text: 'You used a Token!'})
            .header("Authorization", request.headers.authorization);
      }
    }
  ]);
});

server.register([ Inert, Vision, {
  'register': HapiSwagger,
  'options': options
}]);

models.sequelize.sync().then(function() {
  server.start(function() {
    console.log('Running on 8081');
  });
});
