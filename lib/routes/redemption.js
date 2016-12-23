var api = require('../api/redemption');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/redemptions',
    handler: api.redemptions.create,
    config: {
      tags: ['api'], 
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          cost: Joi.number().integer().required(),
          location: Joi.string().required(),
          total: Joi.number().integer(),
          date: Joi.date()
        }
      }
    }
  }
];
