var api = require('../api/project');
var Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/projects/{projectId}/user/{userId}',
    handler: api.projects.addUser,
    config: {
      tags: ['api'],
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
    handler: api.projects.one,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/projects',
    handler: api.projects.all,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/projects',
    handler: api.projects.create,
    config: {
      tags: ['api'],
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
