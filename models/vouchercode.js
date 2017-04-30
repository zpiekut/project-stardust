'use strict';
module.exports = function(sequelize, DataTypes) {
  var VoucherCode = sequelize.define('VoucherCode', {
    code: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        VoucherCode.belongsTo(models.Redemption, {as: 'Redemption'});
        VoucherCode.belongsTo(models.User, {as: 'User'});
      }
    }
  });
  return VoucherCode;
};