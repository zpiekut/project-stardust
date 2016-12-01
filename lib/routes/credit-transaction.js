var api = require('../api/credit-transaction');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: api.transactions.all
  },
  {
    method: 'POST',
    path: '/api/transactions',
    handler: api.transactions.create,
    config: {
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
