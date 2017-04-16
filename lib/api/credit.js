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
      //api.auth.verify(request.token);
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
  redeem: function(request, reply) {
    var creditIds = request.payload.creditIds;

     models.sequelize.transaction(function (t) {
       var promises = []

       creditIds.forEach(function(creditId) {
         var newPromise = models.Credits.update(
           { redeemed: true },
           { where: { id: creditId},
             transaction: t 
           }
        );
        promises.push(newPromise);
       });
       return Promise.all(promises);
     }).then(function (result) {
         reply().code(200);
     }).catch(function (err) {
         reply(error).code(500);
     });
  },
  getUserCredits: function(request, reply) {

    models.Credits.findAll({
      where: {
        UserId: request.params.userId
      }
    })
    .then(function(credits){
      reply({
        credits: credits
      }).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  }
}
