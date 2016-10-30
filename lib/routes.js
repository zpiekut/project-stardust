var api = require('./api');

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
    handler: api.users.create
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
