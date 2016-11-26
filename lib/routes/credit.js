var api = require('../api');

module.exports = [
  {
    method: 'GET',
    path: '/api/credits',
    handler: api.credits.all
  }
];
