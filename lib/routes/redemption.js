var api = require('../api/redemption');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all
  },
  {
    method: 'POST',
    path: '/api/redemptions',
    handler: api.redemptions.create,
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          cost: Joi.number().integer().required(),
          location: Joi.string().required(),
          total: Joi.number().integer()
        }
      }
    }
  }
];
