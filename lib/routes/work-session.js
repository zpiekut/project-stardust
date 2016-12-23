var api = require('../api/work-session');

module.exports = [
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}/unapproved',
    handler: api.sessions.getPersonProjectUnapprovedSessions,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}',
    handler: api.sessions.getPersonProjectHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/time-remaining',
    handler: api.sessions.getProjectTimeLeft,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}',
    handler: api.sessions.getProjectHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/user/{userId}',
    handler: api.sessions.getUserHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/user',
    handler: api.sessions.getAllUserHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/api/work-session/approved',
    handler: api.sessions.approveWorkSession,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/{sessionId}/time',
    handler: api.sessions.getSessionHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/time',
    handler: api.sessions.getTotalHours,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/work-session',
    handler: api.sessions.startWorkSession,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/api/work-session',
    handler: api.sessions.endWorkSession,
    config: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/work-session/',
    handler: api.sessions.all,
    config: {
      tags: ['api']
    }
  }
];
