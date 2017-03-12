var api = require('../api/redemption');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all
    ,config: {auth: true}
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
      auth: false,
      tags: ['api'],
      validate: {
        payload: {
          orgName: Joi.string().required(),
          title: Joi.string().required(),
          hours: Joi.number().integer().required(),
          numSlots: Joi.number().integer().required(),
          time: Joi.string().required(),
          location: Joi.string().required(),
          instructions: Joi.string().required(),
          description: Joi.string().required(),
          about: Joi.string().required(),
          website: Joi.string().required(),
          total: Joi.number().integer().required(),
          image: Joi.string().required()
        }
      }
    }
  }
];
