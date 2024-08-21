import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('members', {
      memberId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      partnerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'partners',
          key: 'partnerId'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'contacts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('members')
  }
}
