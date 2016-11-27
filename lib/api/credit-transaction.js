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
  one: function(request, reply) {
    models.CreditTransactions.findById(request.params.transactionId)
    .then(function (transaction) {
      reply(transaction).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  },
  create: function(request, reply) {
    models.Credits.findById(request.payload.CreditId)
    .then(function (credit) {
      if(credit.UserId === request.payload.FromId) {
        models.Credits.update(
          { UserId: request.payload.ToId },
          { where: { id: credit.id } }
        )
        .then(function(credit) {
          models.CreditTransactions.create(request.payload)
          .then(function (newTransaction) {
            reply(newTransaction).code(200);
          })
        });
      }
      else {
        reply(error).code(500);
      }
    })
    .catch(function (error){
      reply(error).code(500);
    });
  }
}
