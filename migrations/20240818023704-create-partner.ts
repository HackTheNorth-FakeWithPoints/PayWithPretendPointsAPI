'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Partners', {
      partnerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      contactId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      permission: {
        type: Sequelize.ENUM('Read', 'Write', 'Balance Inquiry'),
        allowNull: false
      },
      emailId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Partners')
  }
}
