import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { PARTNER_PERMISSIONS } from '@/constants/partner-permissions.ts'
import { sequelize } from '@/db/index.ts'

extendZodWithOpenApi(z)

interface PartnerAttributes {
  id: number
  status: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  permission: string
  password: string
  createdAt: Date
  updatedAt: Date
}

type PartnerCreationAttributes = Optional<PartnerAttributes, 'id' | 'createdAt' | 'updatedAt'>

class Partner extends Model<PartnerAttributes, PartnerCreationAttributes> {
  declare id: number
  declare status: string
  declare name: string
  declare description: string
  declare address: string
  declare phone: string
  declare email: string
  declare permission: string
  declare password: string
  declare createdAt: Date
  declare updatedAt: Date
}

Partner.init(
  {
    id: {
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
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    permission: {
      type: DataTypes.ENUM(...Object.values(PARTNER_PERMISSIONS)),
      allowNull: false
    },
    password: {
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
    modelName: 'partner',
    tableName: 'partners',
    timestamps: true,
    sequelize
  }
)

const PartnerZod = z.object({
  id: z.number().openapi({ example: 1 }),
  status: z.string().openapi({ example: 'ACTIVE' }),
  name: z.string().openapi({ example: 'Partner Name' }),
  description: z.string().openapi({ example: 'Partner Description' }),
  address: z.string().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().openapi({ example: '4161234567' }),
  email: z.string().openapi({ example: 'partner@example.com' }),
  permission: z.string().openapi({ example: PARTNER_PERMISSIONS.READ }),
  createdAt: z.date().openapi({ example: new Date().toISOString().toString() }),
  updatedAt: z.date().openapi({ example: new Date().toISOString().toString() })
})

export { Partner, PartnerZod, type PartnerCreationAttributes }
