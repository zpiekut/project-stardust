const env     = process.env.NODE_ENV || 'development';
const config  = require('../../config/config')['development'];
var api       = require('../api/redemption');
var Joi       = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/redemptions/user',
    handler: api.redemptions.redeemForVoucher,
    config: {
      auth: config.auth,
      tags: ['api'],
      validate: {
        payload: {
          redemptionId: Joi.number().integer().required(),
          userId: Joi.number().integer().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/redemptions/user/{userId}',
    handler: api.redemptions.getUserRedemptions,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.allActive,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/redemptions',
    handler: api.redemptions.create,
    config: {
      auth: config.auth,
      tags: ['api'],
      validate: {
        payload: {
          orgName: Joi.string().required(),
          title: Joi.string().required(),
          offer: Joi.string().required(),
          cost: Joi.number().integer().required(),
          numSlots: Joi.number().integer().required(),
          time: Joi.string().required(),
          location: Joi.string().required(),
          instructions: Joi.string().required(),
          description: Joi.string().required(),
          about: Joi.string().required(),
          website: Joi.string().required(),
          total: Joi.number().integer().required(),
          image: Joi.string().required(),
          OwnerId: Joi.string().required(),
          expireDate: Joi.date().timestamp('unix').min('now').required()
        }
      }
    }
  }
];
