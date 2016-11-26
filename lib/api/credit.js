var models = require('../../models');

exports.credits = {
  all: function(request, reply) {
    models.Credits.findAll()
    .then(function(credits) {
      reply(credits).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    models.Credits.create({
      createdAt: Date.now(),
      UserId: request.payload.userId,
      redeemed: false
    })
    .then(function(credit) {
      reply(credit).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
}
