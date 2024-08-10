import { DataTypes, Model } from 'sequelize'

import { sequelize } from '@/db/index.ts'

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'User'
  }
)

export { User }
