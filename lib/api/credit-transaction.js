var models      = require('../../models');
var emails      = require('../emails');
//var nodemailer  = require('nodemailer');

var env         = process.env.NODE_ENV || 'development';
var config      = require('../../config/config')[env];

var sendMail = function(params) {

  var userIds = [params.FromId, params.ToId],
      userPromises = [];

  userIds.forEach(function(userId) {
    var newPromise = models.User.findById(userId);
    userPromises.push(newPromise);
  });

  return Promise.all(userPromises)
  .then(function(users) {
    var mailParams1 = {
      toEmail:  users[0].email,
      subject:  'Test Transaction Complete',
      text:     users[0].firstname + ', your transaction with ' + users[1].firstname + ' ' + users[1].lastname + ' was successful!'
    },
    mailParams2 = {
      toEmail:  users[1].email,
      subject:  'Test Transaction Complete',
      text:     users[1].firstname + ', your transaction with ' + users[0].firstname + ' ' + users[0].lastname + ' was successful!'
    };

    // emails.emails.send(mailParams1);
    // emails.emails.send(mailParams2);
  })
  .catch(function (error){
    reply(error).code(500);
  });
}

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
              { where: { id: credit.id },
                transaction: t 
              }
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
        sendMail({
          FromId: request.payload.FromId,
          ToId: request.payload.ToId
        });

        reply(newTransaction).code(200);
      })
      .catch(function (){
        reply().code(500);
      });
    })
    .catch(function (){
      reply().code(500);
    });
  },
  redeemProjectCredits: function(request, reply) {
    var promises = [];
    var numCreditsEarned = 0;

    models.ProjectCode.find({
      where: {code: request.payload.RedeemCode},
      include: [ 
        { model: models.User, where: { id: request.payload.ToId} },
        { model: models.Project, as: 'Project' }
      ]
    })
    .then(function(userCode) {
      if(userCode == null) {

        models.ProjectCode.find({ where: {code: request.payload.RedeemCode},
                                  include: [ {model: models.Project, as: 'Project'} ] })
        .then(function(projectCode) {
          if(projectCode !== null) {
            numCreditsEarned = projectCode.Project.hours;
            models.Credits.findAll({ where: {UserId: projectCode.Project.OwnerId} })
            .then(function(projectOwnerCredits) {
              if(projectOwnerCredits.length < numCreditsEarned) {
                reply("project owner doesnt have enough credits").code(500);
              }
              else {
                var creditsToTransfer = projectOwnerCredits.slice(0, numCreditsEarned);
                models.sequelize.transaction(function (t) {
                  var creditPromises = [];

                  creditsToTransfer.forEach(function(credit) {
                    var updateCreditPromise = models.Credits.update(
                      { UserId: request.payload.ToId },
                      { where: { id: credit.id },
                        transaction: t 
                      }
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
                  });
                  return Promise.all(creditPromises);
                })
                .then(function (newTransaction) {
                  projectCode.addUser(parseInt(request.payload.ToId))
                  .then(function() {
                    // sendMail({
                    //   FromId: request.payload.FromId,
                    //   ToId: request.payload.ToId
                    // });

                    reply(newTransaction).code(200);
                  })
                })
                .catch(function (){
                  reply().code(500);
                });
              }
            })
            .catch(function() {
              console.log("error getting project owner credits");
            })
          }
          else {
            reply("invalid code").code(500);
          }
        })
        .catch(function(error) {
          console.log(error);
          reply("error finding project").code(500);
        });
      }
      else {
        reply("code already redeemed").code(500);
      }
    })
  },
  getAllUserTo: function(request, reply) {
    models.CreditTransactions.findAll(
      { where: { ToId: request.params.userId } }
    )
    .then(function(transactions) {
      reply(transactions).code(200);
    })
    .catch(function (error){
      reply(error).code(500);
    });
  }
}
