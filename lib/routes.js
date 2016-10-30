var api = require('./api');

module.exports = [
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
