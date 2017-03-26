var api = require('../api/user');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: api.users.one,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: api.users.all,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: api.users.create,
    config: {
      auth: false,
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          firstname: Joi.string().min(2).required(),
          lastname: Joi.string().min(2).required(),
          neighborhood: Joi.string().min(3).required()
        }
      }
    }
  }
];
