var models = require('../models');

exports.users = {
  all: function(request, reply) {
    models.User.findAll()
      .then(function(users) {
        reply(users).code(200);
      });
  },
  create: function(request, reply) {
    console.log(request.payload);
    models.User.create(request.payload)
      .then(function (newUser) {
        reply(newUser).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
  }
};
