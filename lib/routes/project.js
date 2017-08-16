const env     = process.env.NODE_ENV || 'development';
const config  = require('../../config/config')['development'];
var api       = require('../api/project');
var Joi       = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/api/projects/user',
    handler: api.projects.addUser,
    config: {
      auth: config.auth,
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
    path: '/api/projects/user/{userId}',
    handler: api.projects.getUserProjects,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/projects/{projectId}',
    handler: api.projects.one,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/projects',
    handler: api.projects.all,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/projects',
    handler: api.projects.create,
    config: {
      auth: config.auth,
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
          image: Joi.string().required(),
          OwnerId: Joi.string().required()
        }
      }
    }
  }
];
