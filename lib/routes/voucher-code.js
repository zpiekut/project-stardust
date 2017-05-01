const env     = process.env.NODE_ENV || 'development';
const config  = require('../../config/config')['development'];
var api 			= require('../api/voucher-code');
var Joi 	  	= require('joi');

module.exports = [
	{
		method: 'GET',
    path: '/api/voucher-code/user/{userId}',
    handler: api.voucherCode.userCodes,
    config: {
    	auth: config.auth,
      tags: ['api']
    }
	}
];