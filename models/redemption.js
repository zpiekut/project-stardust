'use strict';
module.exports = function(sequelize, DataTypes) {
  var Redemption = sequelize.define('Redemption', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    orgName: DataTypes.STRING,
    title: DataTypes.STRING,
    offer: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    numSlots: DataTypes.INTEGER,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    instructions: DataTypes.STRING,
    description: DataTypes.TEXT,
    about: DataTypes.TEXT,
    website: DataTypes.STRING,
    total: DataTypes.INTEGER,
    image: DataTypes.STRING,
    expireDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Redemption.belongsTo(models.User, {as: 'Owner'});
        Redemption.belongsToMany(models.User, {through: 'UserRedemption'});
      }
    }
  });
  return Redemption;
};
