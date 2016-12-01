var api = require('../api/user');
var Joi = require('Joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/users/{userId}',
    handler: api.users.one
  },
  {
    method: 'GET',
    path: '/api/users',
    handler: api.users.all
  },
  {
    method: 'POST',
    path: '/api/users',
    handler: api.users.create,
    config: {
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
