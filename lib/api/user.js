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
    models.User.findAll({where: {email: request.payload.email}}).then(function(dbMatch){
      if(dbMatch.length == 0){
        models.User.create(request.payload)
            .then(function (newUser) {
              reply(newUser).code(200);
            })
            .catch(function (error){
              reply(error).code(500);
            });
      }else{
        reply({message: "Email already exists"});
      }

    });
  }
};
