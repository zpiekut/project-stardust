'use strict';
module.exports = function(sequelize, DataTypes) {
  var Redemption = sequelize.define('Redemption', {
    orgName: DataTypes.STRING,
    title: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    numSlots: DataTypes.INTEGER,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    instructions: DataTypes.STRING,
    description: DataTypes.STRING,
    about: DataTypes.STRING,
    website: DataTypes.STRING,
    total: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Redemption.belongsToMany(models.User, {through: 'UserRedemption'});
      }
    }
  });
  return Redemption;
};
