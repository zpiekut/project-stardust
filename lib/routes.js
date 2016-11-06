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
    method: 'get',
    path: '/api/work-session/project/{projectId}',
    handler: api.sessions.getProjectHours
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
  }
];
