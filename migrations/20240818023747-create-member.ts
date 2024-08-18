'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      memberId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      partnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Partners',
          key: 'partnerId'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0
      },
      status: {
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
    await queryInterface.dropTable('Members')
  }
}
