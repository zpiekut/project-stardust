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
//const corsHeaders = require('hapi-cors-headers');
//const Pack      = require('./package');
const server = new Hapi.Server();

const options = {
  info: {
    'title': 'Test API Documentation'
    //,'version': Pack.version,
  }
};

//fill this out
var validate = function (decoded, request, callback) {
  console.log("Inside validate function");
  var secretKey = 'NeverShareYourSecret';
  var token = request.headers.authorization;
  var verifiedJwt = nJwt.verify(token,secretKey);
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
//   ,options: {
//     origins: ['http://localhost:8081']
//   }
// }, function(err){
//   server.start(function(){
//     console.log("error");
//     console.log(server.info.uri);
//   });
});

server.register(require('hapi-auth-jwt2'), function (err) {

  if(err){
    console.log(err);
  }

  server.auth.strategy('jwt', 'jwt', true,
      { key: 'NeverShareYourSecret',          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: { ignoreExpiration: true }
      });

  //server.auth.default('jwt');

  server.route(require('./lib/routes/user'));
  server.route(require('./lib/routes/project'));
  server.route(require('./lib/routes/credit'));
  server.route(require('./lib/routes/redemption'));
  server.route(require('./lib/routes/work-session'));
  server.route(require('./lib/routes/credit-transaction'));
  server.route(require('./lib/routes/auth'));

  server.route([
    {
      method: ['GET'], path: '/restricted', config: { auth: 'jwt' },
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
