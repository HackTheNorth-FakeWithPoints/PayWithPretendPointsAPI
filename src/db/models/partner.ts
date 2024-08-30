import { DataTypes, Model, Optional } from 'sequelize'

import { PARTNER_PERMISSIONS } from '@/constants/partner-permissions.ts'
import { sequelize } from '@/db/index.ts'

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

type PartnerCreationAttributes = Optional<PartnerAttributes, 'id'>

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
    modelName: 'Partner',
    tableName: 'partners',
    timestamps: true,
    sequelize
  }
)

export { Partner }
