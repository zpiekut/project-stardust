'use strict';

const Hapi      = require('hapi');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config')[env];
const models    = require('./models');
var passport	= require('passport');
const server = new Hapi.Server();

server.connection({ port: 3000 });
server.route(require('./lib/routes/user'));
server.route(require('./lib/routes/project'));
server.route(require('./lib/routes/credit'));
server.route(require('./lib/routes/redemption'));
server.route(require('./lib/routes/work-session'));
server.route(require('./lib/routes/credit-transaction'));
server.route(require('./lib/routes/login'));
server.route(require('./lib/routes/logout'));


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

models.sequelize.sync().then(function() {
  server.start(function() {
    console.log('Running on 3000');
  });
});
