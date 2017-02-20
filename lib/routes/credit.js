var api = require('../api/credit');
var Joi = require('joi');

module.exports = [
  {
    method: 'PUT',
    path: '/api/credits',
    handler: api.credits.redeem,
    config: {
      tags: ['api'],
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
    handler: api.credits.all,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/credits',
    handler: api.credits.create,
    config: {
      tags: ['api'],
      validate: {
        payload: {
          userId: Joi.number().integer().required()
        }
      }
    }
  }
];
