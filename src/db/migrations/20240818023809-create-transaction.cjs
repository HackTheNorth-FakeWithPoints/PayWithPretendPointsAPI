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
        }
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        }
      },
      partnerRefId: {
        type: Sequelize.STRING,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        }
      },
      transactedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        }
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
        }
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
        }
      },
      status: {
        type: Sequelize.ENUM('delete', 'reverse'),
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi
        }
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true
        }
      },
      description: {
        type: Sequelize.JSONB,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        }
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        }
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
