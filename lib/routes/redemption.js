var api = require('../api/redemption');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all
    ,config: {auth: true}
  },
  {
    method: 'POST',
    path: '/api/redemptions',
    handler: api.redemptions.create,
    config: {
      auth: false,
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
