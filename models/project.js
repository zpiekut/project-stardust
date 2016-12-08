'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    location: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, {as: 'Owner'});
        Project.belongsToMany(models.User, {through: 'UserProject'});
        Project.hasMany(models.WorkSession, {as: 'WorkSessions'});
      }
    }
  });
  return Project;
};
