var api = require('../api/credit-transaction');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: api.transactions.all, //unused
    config: {
      auth: 'jwt',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/transactions',
    handler: api.transactions.create, //transfer from user to business
    config: {
      auth: 'jwt',
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
      auth: 'jwt',
      tags: ['api'],
      validate: {
        payload: {
          RedeemCode: Joi.number().integer().required(),
          ToId: Joi.number().integer().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/transactions/to/{userId}',
    handler: api.transactions.getAllUserTo, //unused
    config: {
      auth: 'jwt',
      tags: ['api']
    }
  }
];
