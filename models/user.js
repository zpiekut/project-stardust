"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    neighborhood: DataTypes.STRING
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        // create one to many relationship
      }
    }
  });
  return User;
};
