'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    orgName: DataTypes.STRING,
    title: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    numSlots: DataTypes.INTEGER,
    time: DataTypes.STRING,
    location: DataTypes.STRING,
    instructions: DataTypes.STRING,
    description: DataTypes.STRING,
    about: DataTypes.STRING,
    website: DataTypes.STRING,
    image: DataTypes.STRING
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
