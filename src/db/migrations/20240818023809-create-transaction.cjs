'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
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
          model: 'partners',
          key: 'partnerId'
        },
        onDelete: 'CASCADE'
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'members',
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
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @returns {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions')
  }
}
