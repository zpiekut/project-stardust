/**
* Created by neelkrishna on 3/9/17.
*/
var nJwt = require('njwt');
var uuid = require ('uuid');

exports.auth = {
    verify: function(token){
        var secretKey = uuid.v4();
        var verified;
        verified = nJwt.verify(token, secretKey);
    }


}

