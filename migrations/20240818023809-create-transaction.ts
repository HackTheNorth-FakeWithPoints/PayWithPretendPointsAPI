'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      txnId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      refId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      partnerRefId: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      partnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Partners',
          key: 'partnerId'
        },
        onDelete: 'CASCADE'
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Members',
          key: 'memberId'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('delete', 'reverse'),
        allowNull: false
      },
      txnType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description1: {
        type: Sequelize.STRING
      },
      description2: {
        type: Sequelize.STRING
      },
      description3: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transactions')
  }
}
