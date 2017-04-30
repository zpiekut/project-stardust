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
const SECRET_KEY = 'InvolveMINTsSecret';
//const Pack      = require('./package');
const server = new Hapi.Server();

const options = {
  info: {
    'title': 'Test API Documentation'
    //,'version': Pack.version,
  }
};

var validate = function (decoded, request, callback) {
  console.log("Inside validate function");
  var token = request.headers.authorization;
  var verifiedJwt = nJwt.verify(token, SECRET_KEY);
  if (!verifiedJwt) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};

server.connection({ port: 8081});

server.register({
  register: require('hapi-cors')
});

server.register(require('hapi-auth-jwt2'), function (err) {

  if(err){
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt', true,
      { key: SECRET_KEY,
        validateFunc: validate,
        verifyOptions: { ignoreExpiration: true }
      });

  server.route(require('./lib/routes/user'));
  server.route(require('./lib/routes/project'));
  server.route(require('./lib/routes/credit'));
  server.route(require('./lib/routes/redemption'));
  server.route(require('./lib/routes/work-session'));
  server.route(require('./lib/routes/credit-transaction'));
  server.route(require('./lib/routes/auth'));
  server.route(require('./lib/routes/voucher-code'));
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
