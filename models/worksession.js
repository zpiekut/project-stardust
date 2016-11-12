'use strict';
module.exports = function(sequelize, DataTypes) {
  var WorkSession = sequelize.define('WorkSession', {
    createdAt: DataTypes.DATE,
    endedAt: DataTypes.DATE,
    approved: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return WorkSession;
};
