'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Redemptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orgName: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.INTEGER
      },
      numSlots: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Redemptions');
  }
};
