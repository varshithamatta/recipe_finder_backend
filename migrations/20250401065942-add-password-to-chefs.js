'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Chefs", "password", {
      type: Sequelize.STRING,
      allowNull: false, // Ensure password is required
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Chefs", "password");
  }
};
