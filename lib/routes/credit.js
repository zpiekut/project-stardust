var api = require('../api/credit');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/credits/user/{userId}',
    handler: api.credits.getUserCredits, //current credits not hours
    config: {
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/api/credits',
    handler: api.credits.redeem, //unused
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
    handler: api.credits.all, //unused
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/credits',
    handler: api.credits.create, //unused
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
