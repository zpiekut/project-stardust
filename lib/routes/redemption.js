var api = require('../api/redemption');
var Joi = require('joi');
// var server = require('../../server');
//
// var validate = function (decoded, request, callback) {
//   var secretKey = uuid.v4();
//   var token = request.headers.tokenPassed;
//   var verifiedJwt = nJwt.verify(token,secretKey);
//   if (!verifiedJwt) {
//     return callback(null, false);
//   }
//   else {
//     return callback(null, true);
//   }
// };
//
// server.register(require('hapi-auth-jwt2'), function (err) {
//
//   if(err){
//     console.log(err);
//   }
//
//   server.auth.strategy('jwt', 'jwt',
//       { key: 'NeverShareYourSecret',          // Never Share your secret key
//         validateFunc: validate,            // validate function defined above
//         verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
//       });
//
//   server.auth.default('jwt');
// });

module.exports = [
  {
    method: 'POST',
    path: '/api/redemptions/user',
    handler: api.redemptions.redeemForVoucher,
    config: {
      auth: 'jwt',
      tags: ['api'],
      validate: {
        payload: {
          redemptionId: Joi.number().integer().required(),
          userId: Joi.number().integer().required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/redemptions/user/{userId}',
    handler: api.redemptions.getUserRedemptions,
    config: {
      auth: 'jwt',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/redemptions',
    handler: api.redemptions.all,
    config: {
      tags: ['api'],
      auth: 'jwt'
    }
  },
  {
    method: 'POST',
    path: '/api/redemptions',
    handler: api.redemptions.create,
    config: {
      auth: 'jwt',
      tags: ['api'],
      validate: {
        payload: {
          orgName: Joi.string().required(),
          title: Joi.string().required(),
          offer: Joi.string().required(),
          cost: Joi.number().integer().required(),
          numSlots: Joi.number().integer().required(),
          time: Joi.string().required(),
          location: Joi.string().required(),
          instructions: Joi.string().required(),
          description: Joi.string().required(),
          about: Joi.string().required(),
          website: Joi.string().required(),
          total: Joi.number().integer().required(),
          image: Joi.string().required(),
          OwnerId: Joi.number().integer().required()
        }
      }
    }
  }
];
