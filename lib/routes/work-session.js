var api = require('../api/work-session');

module.exports = [
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}/unapproved',
    handler: api.sessions.getPersonProjectUnapprovedSessions
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/user/{userId}',
    handler: api.sessions.getPersonProjectHours
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}/time-remaining',
    handler: api.sessions.getProjectTimeLeft
  },
  {
    method: 'GET',
    path: '/api/work-session/project/{projectId}',
    handler: api.sessions.getProjectHours
  },
  {
    method: 'GET',
    path: '/api/work-session/user/{userId}',
    handler: api.sessions.getUserHours
  },
  {
    method: 'GET',
    path: '/api/work-session/user',
    handler: api.sessions.getAllUserHours
  },
  {
    method: 'PUT',
    path: '/api/work-session/approved',
    handler: api.sessions.approveWorkSession
  },
  {
    method: 'GET',
    path: '/api/work-session/{sessionId}/time',
    handler: api.sessions.getSessionHours
  },
  {
    method: 'GET',
    path: '/api/work-session/time',
    handler: api.sessions.getTotalHours
  },
  {
    method: 'POST',
    path: '/api/work-session',
    handler: api.sessions.startWorkSession
  },
  {
    method: 'PUT',
    path: '/api/work-session',
    handler: api.sessions.endWorkSession
  },
  {
    method: 'GET',
    path: '/api/work-session/',
    handler: api.sessions.all
  }
];
