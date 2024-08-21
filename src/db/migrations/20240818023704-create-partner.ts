import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('partners', {
      partnerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'contacts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      permission: {
        type: DataTypes.ENUM('Read', 'Write', 'Balance Inquiry'),
        allowNull: false
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
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
    await queryInterface.dropTable('partners')
  }
}
