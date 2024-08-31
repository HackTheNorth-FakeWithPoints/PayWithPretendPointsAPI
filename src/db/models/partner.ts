import { DataTypes, Model } from 'sequelize'

import { PARTNER_PERMISSIONS } from '@/constants/partner-permissions.ts'
import { sequelize } from '@/db/index.ts'
import { Contact } from '@/db/models/index.ts'

class Partner extends Model {
  declare partnerId: number
  declare status: string
  declare name: string
  declare description: string
  declare contactId: number
  declare permission: string
  declare emailId: string
  declare password: string

  static associate(models: { Contact: typeof Contact }) {
    Partner.belongsTo(models.Contact, {
      onDelete: 'CASCADE',
      foreignKey: 'contactId',
      targetKey: 'id'
    })
  }
}

Partner.init(
  {
    partnerId: {
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
    contactId: {
      type: DataTypes.INTEGER
    },
    permission: {
      type: DataTypes.ENUM(...Object.values(PARTNER_PERMISSIONS)),
      allowNull: false
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'partner',
    tableName: 'partners',
    timestamps: true,
    sequelize
  }
)

export { Partner }
