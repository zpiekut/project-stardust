const env     = process.env.NODE_ENV || 'development';
const config  = require('../../config/config')['development'];
var api       = require('../api/work-session');
var Joi       = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}/unapproved',
    handler: api.sessions.getPersonProjectUnapprovedSessions,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}',
    handler: api.sessions.getPersonProjectHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/time-remaining',
    handler: api.sessions.getProjectTimeLeft,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}',
    handler: api.sessions.getProjectHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/user/{userId}',
    handler: api.sessions.getUserHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/user',
    handler: api.sessions.getAllUserHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/api/work-session/approved',
    handler: api.sessions.approveWorkSession,
    config: {
      auth: config.auth,
      tags: ['api'],
      validate: {
        payload: {
          sessionId: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/{sessionId}/time',
    handler: api.sessions.getSessionHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/time',
    handler: api.sessions.getTotalHours,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/work-session',
    handler: api.sessions.startWorkSession,
    config: {
      auth: config.auth,
      tags: ['api'],
      validate: {
        payload: {
          userId: Joi.string().required(),
          projectId: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/work-session',
    handler: api.sessions.endWorkSession,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/',
    handler: api.sessions.all,
    config: {
      auth: config.auth,
      tags: ['api']
    }
  }
];
