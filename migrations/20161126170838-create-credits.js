'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Credits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      redeemed: {
        allowedNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Credits');
  }
};
