var api = require('../api/project');
var Joi = require('Joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/projects/{projectId}/user/{userId}',
    handler: api.projects.addUser,
    config: {
      validate: {
        payload: {
          projectId: Joi.number().integer().required(),
          userId: Joi.number().integer().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/projects/{projectId}',
    handler: api.projects.one
  },
  {
    method: 'GET',
    path: '/api/projects',
    handler: api.projects.all
  },
  {
    method: 'POST',
    path: '/api/projects',
    handler: api.projects.create,
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          hours: Joi.number().integer().required(),
          location: Joi.string().required(),
          OwnerId: Joi.number().integer().required(),
          date: Joi.date()
        }
      }
    }
  }
];
