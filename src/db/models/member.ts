import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { MEMBER_STATUS } from '@/constants/index.ts'
import { sequelize } from '@/db/index.ts'
import { Partner } from '@/db/models/index.ts'

extendZodWithOpenApi(z)

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

type MemberCreationAttributes = Optional<MemberAttributes, 'id' | 'partnerId' | 'createdAt' | 'updatedAt'>

class Member extends Model<MemberAttributes, MemberCreationAttributes> {
  declare id: number
  declare partnerId: number
  declare name: string
  declare address: string
  declare phone: string
  declare email: string
  declare balance: number
  declare status: keyof typeof MEMBER_STATUS
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
      primaryKey: true,
      validate: {
        isInt: true
      },
      field: 'id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Partner,
        key: 'id'
      },
      onDelete: 'CASCADE',
      validate: {
        isInt: true
      },
      field: 'partner_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s]+$/gi,
        len: [2, 50]
      },
      field: 'name'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s.,-]+$/gi,
        len: [2, 255]
      },
      field: 'address'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s.()-]+$/gi,
        len: [2, 25]
      },
      field: 'phone'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
      field: 'email'
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true
      },
      field: 'balance'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(MEMBER_STATUS)),
      allowNull: false,
      defaultValue: MEMBER_STATUS.ACTIVE,
      values: Object.values(MEMBER_STATUS),
      validate: {
        is: /^[\w\s]+$/gi
      },
      field: 'status'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updated_at'
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
  id: z.number().openapi({ example: 1 }),
  partnerId: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'John Doe' }),
  address: z.string().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().openapi({ example: '4161234567' }),
  email: z.string().email().openapi({ example: 'member@example.com' }),
  balance: z.number().openapi({ example: 1000 }),
  status: z.enum([MEMBER_STATUS.ACTIVE, ...Object.values(MEMBER_STATUS)]).openapi({ example: MEMBER_STATUS.ACTIVE }),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Member, MemberZod, type MemberCreationAttributes }
