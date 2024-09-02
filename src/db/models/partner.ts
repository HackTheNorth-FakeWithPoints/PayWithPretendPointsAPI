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
      primaryKey: true,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s]+$/gi,
        len: [2, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: /^[\w\s.,!?'"()-]+$/gi,
        len: [2, 500]
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
    permission: {
      type: DataTypes.ENUM(...Object.values(PARTNER_PERMISSIONS)),
      allowNull: false,
      defaultValue: PARTNER_PERMISSIONS.READ,
      validate: {
        is: /^[\w\s]+$/gi
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /\$2[ayb]\$.{56}/gi
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
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Partner, PartnerZod, type PartnerCreationAttributes }
