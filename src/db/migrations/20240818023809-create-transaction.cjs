'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: true
        },
        field: 'id'
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        },
        field: 'reference'
      },
      partnerRefId: {
        type: Sequelize.STRING,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        },
        field: 'partner_ref_id'
      },
      transactedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'transacted_at'
      },
      partnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'partner_id'
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'member_id'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'REVERSED', 'INVALIDATED'),
        allowNull: false,
        defaultValue: 'PENDING',
        values: ['PENDING', 'COMPLETED', 'REVERSED', 'INVALIDATED'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'status'
      },
      type: {
        type: Sequelize.ENUM('PAYMENT', 'REFUND', 'ADJUSTMENT', 'CREDIT', 'PENALTY', 'INTERNAL'),
        allowNull: false,
        defaultValue: 'PAYMENT',
        values: ['PAYMENT', 'REFUND', 'ADJUSTMENT', 'CREDIT', 'PENALTY', 'INTERNAL'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'type'
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true
        },
        field: 'amount'
      },
      description: {
        type: Sequelize.JSONB,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        },
        field: 'description'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'updated_at'
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
