import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('transactions', {
      txnId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      refId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      partnerRefId: {
        type: DataTypes.STRING
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      partnerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'partners',
          key: 'partnerId'
        },
        onDelete: 'CASCADE'
      },
      memberId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'members',
          key: 'memberId'
        },
        onDelete: 'CASCADE'
      },
      status: {
        type: DataTypes.ENUM('delete', 'reverse'),
        allowNull: false
      },
      txnType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      description1: {
        type: DataTypes.STRING
      },
      description2: {
        type: DataTypes.STRING
      },
      description3: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('transactions')
  }
}
