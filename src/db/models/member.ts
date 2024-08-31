import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { sequelize } from '@/db/index.ts'
import { Partner } from '@/db/models/index.ts'

interface MemberAttributes {
  id: number
  partnerId: number
  name: string
  address: string
  phone: string
  email: string
  balance: number
  status: string
  createdAt: Date
  updatedAt: Date
}

type MemberCreationAttributes = Optional<MemberAttributes, 'id' | 'createdAt' | 'updatedAt'>

class Member extends Model<MemberAttributes, MemberCreationAttributes> {
  declare id: number
  declare partnerId: number
  declare name: string
  declare address: string
  declare phone: string
  declare email: string
  declare balance: number
  declare status: string
  declare createdAt: Date
  declare updatedAt: Date

  static associate(models: { Partner: typeof Partner }) {
    Member.belongsTo(models.Partner, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
  }
}

Member.init(
  {
    id: {
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
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
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

const MemberZod = z.object({
  id: z.number(),
  partnerId: z.number(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  balance: z.number(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export { Member, MemberZod, type MemberCreationAttributes }
