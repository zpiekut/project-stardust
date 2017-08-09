/**
 * Created by neelkrishna on 3/9/17.
 */

var jsonwebtoken = require('jsonwebtoken');
var models = require('../../models');
var api = require('../api/user');
var aguid = require('aguid');
var crypto = require('crypto');
const SECRET_KEY = 'InvolveMINTsSecret';

var genRandomString = function(){
    return crypto.randomBytes(Math.ceil(16/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,16);   /** return 16 characters */
};
var aesEncrypt = function(password, salt){
    var hash = crypto.createCipher('aes-256-ctr', salt+password); /** Hashing algorithm aes-256-ctr */
    var value = hash.update('text','utf8','hex');
    value += hash.final('hex');
    return {
        salt: salt,
        passwordHash:value
    };
};

module.exports = [
    {
        method: "POST", path: "/api/auth/login", config: { auth: false },
        handler: function(request, reply) {
            var userInfo =  request.payload.user;
            //Matches
            models.User.findAll({where: {email: userInfo.username}}).then(function(dbMatch){
                if(dbMatch.length > 0){
                    console.log("user: " + JSON.stringify(dbMatch));
                    console.log("user password: " + JSON.stringify(userInfo.password));
                    var passwordInput = aesEncrypt(userInfo.password, dbMatch[0].dataValues.salt);

                    if(dbMatch[0].dataValues.password !== passwordInput.passwordHash){
                        reply({user: userInfo, jwt: null});
                    }else{
                        var session = {
                            valid: true,
                            id: aguid(),
                            exp: new Date().getTime() + 30 * 60 * 1000
                        };
                        var jwt = jsonwebtoken.sign(session, SECRET_KEY);
                        dbMatch[0].dataValues.password = '';
                        reply({user: dbMatch[0].dataValues, jwt: jwt});
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

            models.User.findAll({where: {email: request.payload.username}}).then(function(dbMatch){
                if(request.payload.password != request.payload.confirmPassword){
                    reply({message: "Passwords do not match"});
                }else{
                    if(dbMatch.length == 0){

                         //Salt used to greatly reduce the risk of information breach
                        var salt = genRandomString(); /** Gives us salt of length 16 */
                        var passwordData = aesEncrypt(request.payload.password, salt); /*Returns object with PasswordHash and Salt */

                        //temporary patch because attribute names don't match up:
                        request.payload.email = request.payload.username;
                        request.payload.zipcode = request.payload.zip;
                        request.payload.firstname = request.payload.firstName;
                        request.payload.lastname = request.payload.lastName;
                        request.payload.password = passwordData.passwordHash;
                        request.payload.salt = passwordData.salt;

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