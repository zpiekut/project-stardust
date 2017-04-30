var api = require('../api/voucher-code');
var Joi = require('joi');

module.exports = [
	{
		method: 'GET',
    path: '/api/voucher-code/user/{userId}',
    handler: api.voucherCode.userCodes,
    config: {
    	auth: false,
      tags: ['api']
    }
	}
];