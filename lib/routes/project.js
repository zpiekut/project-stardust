var api = require('../api');

module.exports = [
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
