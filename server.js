'use strict';

const Hapi      = require('hapi');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config/config')[env];
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const models    = require('./models');
const uuid      = require('uuid');
const nJwt      = require('njwt');
//const Pack      = require('./package');
const server = new Hapi.Server();

const options = {
  info: {
    'title': 'Test API Documentation'
    //,'version': Pack.version,
  }
};

server.connection({ port: 8081 });
server.route(require('./lib/routes/user'));
server.route(require('./lib/routes/project'));
server.route(require('./lib/routes/credit'));
server.route(require('./lib/routes/redemption'));
server.route(require('./lib/routes/work-session'));
server.route(require('./lib/routes/credit-transaction'));
server.route(require('./lib/routes/auth'));


//fill this out
var validate = function (decoded, request, callback) {
  var secretKey = uuid.v4();
  var token = request.headers.tokenPassed;
  var verifiedJwt = nJwt.verify(token,secretKey);
  if (!verifiedJwt) {
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
