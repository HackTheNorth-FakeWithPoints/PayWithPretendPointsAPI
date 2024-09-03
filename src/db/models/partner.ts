import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { PARTNER_PERMISSIONS, PARTNER_STATUS } from '@/constants/partners.ts'
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
  declare status: keyof typeof PARTNER_STATUS
  declare name: string
  declare description: string
  declare address: string
  declare phone: string
  declare email: string
  declare permission: keyof typeof PARTNER_PERMISSIONS
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
      primaryKey: true,
      validate: {
        isInt: true
      },
      field: 'id'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(PARTNER_STATUS)),
      allowNull: false,
      defaultValue: PARTNER_STATUS.ACTIVE,
      values: Object.values(PARTNER_STATUS),
      validate: {
        is: /^[\w\s]+$/gi
      },
      field: 'status'
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^[\w\s.,!?'"()-]+$/gi,
        len: [2, 500]
      },
      field: 'description'
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
    permission: {
      type: DataTypes.ENUM(...Object.values(PARTNER_PERMISSIONS)),
      allowNull: false,
      defaultValue: PARTNER_PERMISSIONS.READ,
      values: Object.values(PARTNER_PERMISSIONS),
      validate: {
        is: /^[\w\s]+$/gi
      },
      field: 'permission'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /\$2[ayb]\$.{56}/gi
      },
      field: 'password'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updated_at'
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
  status: z.enum([PARTNER_STATUS.ACTIVE, ...Object.values(PARTNER_STATUS)]).openapi({ example: PARTNER_STATUS.ACTIVE }),
  name: z.string().openapi({ example: 'Partner Name' }),
  description: z.string().openapi({ example: 'Partner Description' }),
  address: z.string().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().openapi({ example: '4161234567' }),
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Partner, PartnerZod, type PartnerCreationAttributes }
