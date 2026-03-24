'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Medicines', 'threshold', {
      type: Sequelize.INTEGER,
      allowNull: true,      // optional
      defaultValue: 5       // default threshold if not specified
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Medicines', 'threshold');
  }
};