/**
 * Created by neelkrishna on 3/9/17.
 */

var nJwt = require('njwt');
var uuid = require ('uuid');
var models = require('../../models');
var api = require('../api/user');

module.exports = [
    {
        method: "POST", path: "/api/auth/login", config: { auth: false },
        handler: function(request, reply) {
            console.log("here");
             var secretKey = uuid.v4();
            var claims = {
                sub: 'user9876',
                iss: 'http://involvemint.com',
                permissions: 'admin'
            };
            console.log("Payload" + JSON.parse(JSON.stringify(request.payload)));
            var userInfo =  JSON.parse(request.payload);
            console.log("X: " + userInfo.user.email);

            models.User.findAll({where: {email: userInfo.user.email}}).then(function(dbMatch){
                if(dbMatch.length > 0){
                    console.log("user: " + JSON.stringify(dbMatch));
                    console.log("user password: " + JSON.stringify(userInfo.user.password));
                    if(dbMatch[0].dataValues.password !== userInfo.user.password){
                        reply({user: userInfo.user, jwt: null});
                    }else{
                        var jwt = nJwt.create(claims,secretKey);
                        console.log("Jay Dub Tee: " + jwt);
                        //console.log(request.payload);
                        reply({user: userInfo.user, jwt: jwt});
                    }
                }else{
                    reply({user: "User not found", jwt: null});
                }

            });


        }
    },
    {
        method: "POST", path: "/api/auth/signup", config: { auth: false },
        handler: function(request, reply) {
            console.log("heresignup");
            console.log("Payload" + JSON.parse(JSON.stringify(request.payload)));
            var userInfo =  JSON.parse(request.payload);
            console.log("X: " + userInfo.user.email);
            models.User.findAll({where: {email: userInfo.user.email}}).then(function(dbMatch){
                if(dbMatch.length == 0){
                    api.users.create(userInfo.user);
                }else{
                    reply({user: "Email already exists", jwt: null});
                }

            });


        }
    },
    {
        method: "POST", path: "/api/auth/logout", config: { auth: false },
        handler: function(request, reply) {
            reply({text: 'Logout'});
        }
    }
];