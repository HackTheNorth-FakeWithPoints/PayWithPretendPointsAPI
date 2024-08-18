import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@/db/index.ts'

class Contact extends Model {
  declare id: number
  declare address: string
  declare phone: string
  declare email: string
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'contact',
    tableName: 'contacts',
    timestamps: true,
    sequelize
  }
)

export { Contact }
