var api = require('./api');

module.exports = [
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
    method: 'PUT',
    path: '/api/work-session/approved',
    handler: api.sessions.approveWorkSession
  },
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
    method: 'GET',
    path: '/api/work-session/',
    handler: api.sessions.all
  },
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
    handler: api.users.create
  },
  {
    method: 'POST',
    path: '/api/projects/{projectId}/user/{userId}',
    handler: api.projects.addUser
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
    handler: api.projects.create
  },
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all
  },
  {
    method: 'GET',
    path: '/api/credits',
    handler: api.credits.all
  }
];
