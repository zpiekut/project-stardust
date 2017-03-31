"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    zipcode: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Project, {through: 'UserProject'});
        User.hasMany(models.WorkSession, {as: 'WorkSessions'});
        User.hasMany(models.Credits, {as: 'Credits'});
      }
    }
  });
  return User;
};
