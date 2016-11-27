var api = require('../api/credit-transaction');

module.exports = [
  {
    method: 'GET',
    path: '/api/transactions',
    handler: api.transactions.all
  }
];
