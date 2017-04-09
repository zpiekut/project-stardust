var api = require('../api/credit-transaction');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: api.transactions.all, //unused
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/transactions',
    handler: api.transactions.create, //transfer from user to business
    config: {
      tags: ['api'],
      validate: {
        payload: {
          FromId: Joi.number().integer().required(),
          ToId: Joi.number().integer().required(),
          CreditIds: Joi.array().items(Joi.number().integer()).required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/transactions/project-redeem',
    handler: api.transactions.redeemProjectCredits, //when code entered, transfer from org to user
    config: {
      tags: ['api'],
      validate: {
        payload: {
          RedeemCode: Joi.number().integer().required(),
          ToId: Joi.number().integer().required()
        }
      }
    }
  }
];
