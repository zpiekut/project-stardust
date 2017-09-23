var models = require('../models');
var env    = process.env.NODE_ENV || 'development';
var aws    = require('aws-sdk');
require('dotenv').config({path:'../../config'});
var config = require('../config/config')["aws"];


// aws.config.update({
//     'accessKeyId': process.env.AWSAccessKeyId,
//     'secretAccessKey': process.env.AWSSecretKey,
//     'region': process.env.Region
// });
aws.config.update({
     'accessKeyId': config.accessKeyId,
     'secretAccessKey': config.secretAccessKey,
     'region': config.region
 });
var ses    = new aws.SES({apiVersion: '2010-12-01'});
var from   = 'no-reply@involvemint.co';

exports.emails = {
  send: function(params) {
    models.User.findById(params.userId)
    .then(function (user) {
      console.log('email to user: ' + JSON.stringify(user));
      ses.sendEmail( { 
        Source: from, 
        Destination: { ToAddresses: [user.email] },
        Message: {
          Subject: {
            Data: params.subject
          },
          Body: {
            Text: {
              Data: params.body
            }
          }
        }
      }
      , function(err, data) {
          if(err) throw err
          console.log('Email sent:');
          console.log(data);
      });
      return;
    })
    .catch(function (error){
      console.log(error);
    });
  }
}
