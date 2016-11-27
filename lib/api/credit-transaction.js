var models = require('../../models');

exports.transactions = {
  all: function(request, reply) {
    models.CreditTransactions.findAll()
    .then(function(transactions) {
      reply(transactions).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
}
