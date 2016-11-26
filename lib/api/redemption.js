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
  }
}
