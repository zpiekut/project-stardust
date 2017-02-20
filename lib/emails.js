// var nodemailer  = require('nodemailer');
<<<<<<< HEAD
// var env         = process.env.NODE_ENV || 'development';
// var config      = require('../config/config')[env];
//
// exports.emails = {
//   send: function(params) {
//     console.log(params);
//     var transporter = nodemailer.createTransport({
//           service: 'Gmail',
//           auth: {
//             user: config.fromEmail,
//             pass: config.emailPass
//           }
//         }),
//         mailOptions = {
//           from: config.fromEmail,
//           to: params.toEmail,
//           subject: params.subject,
//           text: params.text
//         };
//     transporter.sendMail(mailOptions, function(error, info){
//       if(error){
//           console.log(error);
//       }
//       else{
//           console.log('Message sent: ' + info.response);
//       };
//     });
//   }
// }
=======
var env         = process.env.NODE_ENV || 'development';
var config      = require('../config/config')[env];

exports.emails = {
  send: function(params) {
    console.log(params);
    var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: config.fromEmail,
            pass: config.emailPass
          }
        }),
        mailOptions = {
          from: config.fromEmail,
          to: params.toEmail,
          subject: params.subject,
          text: params.text
        };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }
      else{
          console.log('Message sent: ' + info.response);
      };
    });
  }
}
>>>>>>> a7c443367fb3bf54c7c55291ae8c5a160213252d
