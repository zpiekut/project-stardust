const env     = process.env.NODE_ENV || 'development';
const config  = require('../../config/config')['development'];
var api       = require('../api/user');
var Joi       = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: api.users.one,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: api.users.all,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: api.users.create,
    config: {
      auth: config.auth,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          confirmpassword: Joi.string().min(6).required(),
          firstname: Joi.string().min(2).required(),
          lastname: Joi.string().min(2).required(),
          age: Joi.number().integer().required(),
          zipcode: Joi.number().integer().min(5).required()
        }
      }
    }
  }
];
