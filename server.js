'use strict';

const Hapi        = require('hapi');
const Inert       = require('inert');
const Vision      = require('vision');
const HapiSwagger = require('hapi-swagger');
const env         = process.env.NODE_ENV || 'development';
const config      = require(__dirname + '/config/config')[env];
const models      = require('./models');
const Pack        = require('./package');
const Bcrypt      = require('bcrypt')
const BasicAuth   = require('hapi-auth-basic');
const server      = new Hapi.Server();

//need to replace this with sequelize db
//this thing is only letting me use bcrypt generated passwords http://bcrypthashgenerator.apphb.com/
var users = {
  jeansboy: {
    id: '1',
    email: 'past',
    password: '$2a$06$cXSVf55GIMhBUrFzP/qNIOjHdesnZErNYVYWv1IPyUo1KT2QrTtFW'  // 'secret'
  },
  appleboy: {
    id: '2',
    email: 'future',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG'  // 'studio'
  }
}
var myUsers;
models.User.findAll().then(function(data) {
  myUsers = data;
});
console.log('users ' + users);
console.log('myUsers ' + myUsers);


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

server.register(BasicAuth, function (err) {
  if (err) {
    throw err
  }

  var basicValidation  = function (request, email, password, callback) {
    var user = users[ email ]

    if (!user) {
      return callback(null, false)
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
      callback(err, isValid, { id: user.id, email: user.email })
    })
  }

  server.auth.strategy('simple', 'basic', { validateFunc: basicValidation })

  //what do I need to do to make auth:simple available outside this register? And outside this server class?
  //what should the role of this side of auth be? Should all auth occur in client and only check for users here?
  //do I have to add this entire basic vaildation register to each file that has a route I need to secure,
  //and then encapsulate the route in this register method?
  server.route({
    method: 'GET',
    path: '/test-route',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        reply('Authenticated')
      }
    }
  })
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

