'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedules_themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'Schedules_themes', key: 'id'}
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'Themes', key: 'id'}
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedules_themes');
  }
};