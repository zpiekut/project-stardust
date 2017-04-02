'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectCode = sequelize.define('ProjectCode', {
    code: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        ProjectCode.belongsTo(models.Project, {as: 'Project'});
        ProjectCode.belongsToMany(models.User, {through: 'UserCodesRedeemed'});
      }
    }
  });
  return ProjectCode;
};
