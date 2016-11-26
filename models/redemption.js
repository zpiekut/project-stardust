'use strict';
module.exports = function(sequelize, DataTypes) {
  var Redemption = sequelize.define('Redemption', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Redemption.belongsToMany(models.User, {through: 'UserRedemption'});
      }
    }
  });
  return Redemption;
};
