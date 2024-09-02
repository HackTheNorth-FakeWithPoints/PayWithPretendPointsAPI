import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

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
      primaryKey: true,
      validate: {
        isInt: true
      }
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
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s]+$/gi,
        len: [2, 50]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s.-]+$/gi,
        len: [2, 255]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s.()-]+$/gi,
        len: [2, 25]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s]+$/gi
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      }
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
  status: z.string().openapi({ example: 'ACTIVE' }),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Member, MemberZod, type MemberCreationAttributes }
