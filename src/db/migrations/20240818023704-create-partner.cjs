'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('partners', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: true
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi,
          len: [2, 50]
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.-]+$/gi,
          len: [2, 255]
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      permission: {
        type: Sequelize.ENUM('Read', 'Write', 'Balance_Inquiry'),
        allowNull: false,
        defaultValue: 'Read',
        validate: {
          is: /^[\w\s]+$/gi
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /\$2[ayb]\$.{56}/gi
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
    await queryInterface.dropTable('partners')
  }
}
