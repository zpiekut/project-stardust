'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectCode = sequelize.define('ProjectCode', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
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
