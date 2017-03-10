/**
 * Created by neelkrishna on 3/9/17.
 */
module.exports = [
    {
        method: "POST", path: "/api/auth/logout", config: { auth: false },
        handler: function(request, reply) {
            reply({text: 'Logout'});
        }
    }
];