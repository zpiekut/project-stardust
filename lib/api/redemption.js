var models = require('../../models');

function getRandomCode() {
    return Math.floor(Math.random()*90000) + 10000;
}

exports.redemptions = {
  all: function(request, reply) {
    models.Redemption.findAll()
    .then(function(redemptions) {
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
  },
  redeemForVoucher: function(request, reply) {
    var redemptionId = request.payload.redemptionId;
    var userId = request.payload.userId;

    var userCredits = [];

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

    models.Credits.findAll({
      where: { userId: userId }
    })
    .then(function(resUserCredits) {
      userCredits = resUserCredits;

      models.Redemption.findById(redemptionId)
      .then(function(redemption){
        redemption.hasUser(userId)
        .then(function(hasUser) {

          if(!hasUser) {
            if(redemption !== null && redemption.cost <= userCredits.length ) {
            
              var creditsToTransfer = userCredits.slice(0, redemption.cost);

              models.sequelize.transaction(function(t) {
                var creditPromises = [];
                creditsToTransfer.forEach(function(credit) {
                  var updateCreditPromise = models.Credits.update(
                    { UserId: redemption.OwnerId },
                    { where: { id: credit.id },
                      transaction: t 
                    }
                  );
                  creditPromises.push(updateCreditPromise);

                  var newTransactionPromise = models.CreditTransactions.create(
                    {
                      FromId: userId,
                      ToId: redemption.OwnerId,
                      CreditId: credit.id
                    },
                    { transaction: t }
                  );
                  creditPromises.push(newTransactionPromise);
                });
                return Promise.all(creditPromises);
              })
              .then(function() {
                var randomCode = getRandomCode();
                var voucherCode = {
                  code: randomCode,
                  RedemptionId: redemption.id,
                  UserId: userId,
                  used: false
                }

                models.VoucherCode.create(voucherCode)
                .then(function(newVoucher) {
                  redemption.addUser(parseInt(userId))
                  .then(function() {
                    reply(newVoucher).code(200);
                  })
                })
              })
            }
            else {
              reply("not enough credits").code(500);  
            }
          }
          else {
            reply("already claimed this voucher").code(500);
          }
        })
        
      })
    })
    .catch(function(error){
      console.log(error);
      reply().code(500);
    })
  }
}
