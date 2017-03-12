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
    models.User.create(request.payload)
      .then(function (newUser) {
        //TODO: this ORM is creating null users. Solution? Something to do with signup.html
        reply(newUser).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  }
};
