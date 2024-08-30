import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@/db/index.ts'

class Member extends Model {
  declare memberId: number
  declare partnerId: number
  declare name: string
  declare contactId: number
  declare balance: number
  declare status: string
  declare createdAt: Date
  declare updatedAt: Date

  static associate = (models: any) => {
    Member.belongsTo(models.Partner, {
      onDelete: 'CASCADE'
    })

    Member.belongsTo(models.Contact, {
      onDelete: 'CASCADE'
    })
  }
}

Member.init(
  {
    memberId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    partnerId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactId: {
      type: DataTypes.INTEGER
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
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    modelName: 'member',
    tableName: 'members',
    timestamps: true,
    sequelize
  }
)

export { Member }
