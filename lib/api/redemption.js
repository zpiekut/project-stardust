var models = require('../../models');

exports.redemptions = {
  all: function(request, reply) {
    models.Redemption.findAll()
    .then(function(redemptions) {
      console.log('then: ' + redemptions);
      reply(redemptions).code(200);
    })
    .catch(function (error){
      console.log(error);
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    models.Redemption.create(request.payload)
    .then(function(redemption) {
      reply(redemption).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  addUser: function(request, reply) {
    var redemptionId = request.payload.redemptionId;
    var userId = request.payload.userId;

    function addUser(userId, reply, redemption) {
      redemption.addUser(parseInt(userId))
      .then(function(addedUser) {
        reply(addedUser).code(200);
      })
      .catch(function (error) {
        console.log(error);
        reply().code(500);
      });
    }

    models.Redemption.findById(redemptionId)
    .then(addUser.bind(null, userId, reply))
    .catch(function(error) {
      console.log(error);
      reply().code(500);
    });
  },
  getUserRedemptions: function(request, reply) {
    models.Redemption.findAll({
      include: [{
        model: models.User,
        where: { id: request.params.userId }
      }]
    })
    .then(function(userRedemptions) {
      reply(userRedemptions).code(200);
    })
    .catch(function(error) {
      console.log(error);
      reply().code(500);
    });
  }
}
