var api = require('../api/credit-transaction');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: api.transactions.all,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/transactions',
    handler: api.transactions.create,
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
  }
];
