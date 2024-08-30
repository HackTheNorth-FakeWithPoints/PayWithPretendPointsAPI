import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@/db/index.ts'
import { Contact, Partner } from '@/db/models/index.ts'

class Member extends Model {
  declare memberId: number
  declare partnerId: number
  declare name: string
  declare contactId: number
  declare balance: number
  declare status: string
  declare createdAt: Date
  declare updatedAt: Date
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
      type: DataTypes.INTEGER,
      references: {
        model: Partner,
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
        model: Contact,
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
