var models = require('../../models');

exports.redemptions = {
  all: function(request, reply) {
    models.Redemption.findAll()
    .then(function(redemptions) {
      reply(redemptions).code(200);
    })
    .catch(function (error){
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
  }
}
