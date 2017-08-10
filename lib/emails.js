var models = require('../models');
var env    = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

var aws    = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
var ses    = new aws.SES({apiVersion: '2010-12-01'});
var from   = 'no-reply@involvemint.co';
var region = 'us-east-1';


exports.emails = {
  send: function(params) {
    models.User.findById(params.userId)
    .then(function (user) {
      console.log('email to user: ' + JSON.stringify(user));
      aws.config.update({region: region});
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
