var api = require('../api/user');

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
  }
];
