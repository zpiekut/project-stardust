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
    var promises = [];
    request.payload.CreditIds.forEach(function(creditId) {
      var newPromise = models.Credits.findById(creditId);
      promises.push(newPromise);
    });
    return Promise.all(promises)
    .then(function(credits) {
      models.sequelize.transaction(function (t) {
        var creditPromises = [];
        credits.forEach(function(credit) {
          if(credit.UserId === request.payload.FromId) {
            var updateCreditPromise = models.Credits.update(
              { UserId: request.payload.ToId },
              { where: { id: credit.id } },
              { transaction: t }
            );
            creditPromises.push(updateCreditPromise);

            var newTransactionPromise = models.CreditTransactions.create(
              {
                FromId: request.payload.FromId,
                ToId: request.payload.ToId,
                CreditId: credit.id
              },
              { transaction: t }
            );
            creditPromises.push(newTransactionPromise);
          }
        });
        return Promise.all(creditPromises);
      })
      .then(function (newTransaction) {
        reply(newTransaction).code(200);
      })
      .catch(function (error){
        reply(error).code(500);
      });
    })
    .catch(function (error){
      reply(error).code(500);
    });
  }
}
