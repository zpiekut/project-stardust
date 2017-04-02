/**
 * Created by neelkrishna on 3/9/17.
 */

var jsonwebtoken = require('jsonwebtoken');
var models = require('../../models');
var api = require('../api/user');
var aguid = require('aguid');
const SECRET_KEY = 'InvolveMINTsSecret';

module.exports = [
    {
        method: "POST", path: "/api/auth/login", config: { auth: false },
        handler: function(request, reply) {
            var userInfo =  JSON.parse(request.payload);
            //Matches
            models.User.findAll({where: {email: userInfo.user.email}}).then(function(dbMatch){
                if(dbMatch.length > 0){
                    console.log("user: " + JSON.stringify(dbMatch));
                    console.log("user password: " + JSON.stringify(userInfo.user.password));
                    if(dbMatch[0].dataValues.password !== userInfo.user.password){
                        reply({user: userInfo.user, jwt: null});
                    }else{
                        var session = {
                            valid: true,
                            id: aguid(),
                            exp: new Date().getTime() + 30 * 60 * 1000
                        };
                        var jwt = jsonwebtoken.sign(session, SECRET_KEY);
                        dbMatch[0].dataValues.password = null;
                        reply({user: dbMatch[0], jwt: jwt});
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

            models.User.findAll({where: {email: request.payload.email}}).then(function(dbMatch){
                if(request.payload.password != request.payload.confirmpassword){
                    reply({message: "Passwords do not match"});
                }else{
                    if(dbMatch.length == 0){
                        models.User.create(request.payload)
                            .then(function (newUser) {
                                reply(newUser).code(200);
                            })
                            .catch(function (error){
                                reply(error).code(500);
                            });
                    }else{
                        reply({message: "Email already exists"});
                    }
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