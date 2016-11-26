var api = require('../api/credit');

module.exports = [
  {
    method: 'PUT',
    path: '/api/credits',
    handler: api.credits.redeem
  },
  {
    method: 'GET',
    path: '/api/credits',
    handler: api.credits.all
  },
  {
    method: 'POST',
    path: '/api/credits',
    handler: api.credits.create
  }
];
