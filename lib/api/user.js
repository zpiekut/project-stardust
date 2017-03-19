var models = require('../../models');

exports.users = {
  all: function(request, reply) {
    models.User.findAll()
      .then(function(users) {
        reply(users).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  },
  one: function(request, reply) {
    models.User.findById(request.params.userId)
    .then(function (user) {
      reply(user).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    console.log("request without payload " + request);
    models.User.create(request)
      .then(function (newUser) {
        //TODO: resolve "reply is not a function" priority low
        reply(newUser).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  }
};
