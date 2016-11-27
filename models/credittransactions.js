'use strict';
module.exports = function(sequelize, DataTypes) {
  var CreditTransactions = sequelize.define('CreditTransactions', {
  }, {
    classMethods: {
      associate: function(models) {
        CreditTransactions.belongsTo(models.User, {as: 'From'});
        CreditTransactions.belongsTo(models.User, {as: 'To'});
        CreditTransactions.belongsTo(models.Credits, {as: 'Credit'});
      }
    }
  });
  return CreditTransactions;
};
