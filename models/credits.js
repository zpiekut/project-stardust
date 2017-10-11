'use strict';
module.exports = function(sequelize, DataTypes) {
  var Credits = sequelize.define('Credits', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    redeemed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Credits;
};
