"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    neighborhood: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Project, {through: 'UserProject'});
        User.hasMany(models.WorkSession, {as: 'WorkSessions'});
      }
    }
  });
  return User;
};
