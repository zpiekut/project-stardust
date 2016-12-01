var api = require('../api/credit');
var Joi = require('Joi');

module.exports = [
  {
    method: 'PUT',
    path: '/api/credits',
    handler: api.credits.redeem,
    config: {
      validate: {
        payload: {
          creditIds: Joi.array().items(Joi.number().integer()).required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/credits',
    handler: api.credits.all
  },
  {
    method: 'POST',
    path: '/api/credits',
    handler: api.credits.create,
    config: {
      validate: {
        payload: {
          userId: Joi.number().integer().required()
        }
      }
    }
  }
];
