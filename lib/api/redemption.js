var models = require('../../models');
var emailApi = require('../emails');
var moment = require('moment');

function getRandomCode() {
    return Math.floor(Math.random()*90000) + 10000;
}

function formatAddUserEmailBody(params) {
  return 'Verification Code: ' + params.code
    + '\n\nCongratulations! \n' + params.username 
    + 'A New Voucher for ' + params.redemptionName 
    + ' has been claimed on ' + params.time
    + '\n\nUser Details: ' 
    + '\nFirst Name: ' + params.firstName
    + '\nLast Name: ' + params.lastName
    + '\nEmail: ' + params.username
    + '\n\nRedeeming Opportunity Details:'
    + '\nName: ' + params.redemptionName
    + '\nTime: ' + params.time
    + '\nSlots Remaining: ' + params.slotsLeft + ' of ' + params.totalSlots
    + '\n\nIf you have any comments or concerns please contact joininvolvemint@gmail.com.'
    + '\n\nThank you for participating with involveMINT!'
    + '\n\nSincerely,'
    + '\ninvolveMINT Team';
} 

exports.redemptions = {
  all: function(request, reply) {
    models.Redemption.findAll()
    .then(function(redemptions) {
      reply(redemptions).code(200);
    })
    .catch(function (error){
      console.log(error);
      reply().code(500);
    });
  },
  allActive: function(request, reply) {
    console.log(moment().format());
    models.Redemption.findAll({
      where: { expireDate: {
        $gt: moment().format()
      }}
    })
    .then(function(redemptions) {
      reply(redemptions).code(200);
    })
    .catch(function (error){
      console.log(error);
      reply().code(500);
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
      redemption.addUser(userId)
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
                  redemption.addUser(userId)
                  .then(function() {
                    models.User.findById(userId)
                    .then(function (user) {
                      models.Redemption.findAll({
                        include: [{
                            model: models.User,
                            where: { id: userId }
                        }]
                      })
                      .then(function(userRedemptions) {
                        
                        var body = formatAddUserEmailBody({
                          username: user.email,
                          time: redemption.time,
                          firstName: user.firstname,
                          lastName: user.lastname,
                          redemptionName: redemption.title,
                          totalSlots: redemption.numSlots,
                          slotsLeft: redemption.numSlots - userRedemptions[0].Users.length,
                          code: randomCode
                        });

                        emailApi.emails.send({
                          userId: redemption.OwnerId,
                          subject: 'New signup',
                          body: body
                        });

                        reply(newVoucher).code(200);
                      })
                    })
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
