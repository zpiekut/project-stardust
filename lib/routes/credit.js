var api = require('../api/credit');

module.exports = [
  {
    method: 'GET',
    path: '/api/credits',
    handler: api.credits.all
  }
];
