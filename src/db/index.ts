import { Sequelize } from 'sequelize-typescript'

// eslint-disable-next-line no-restricted-imports
import { SEQUELIZE_CONFIG } from './config/config.ts'

const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  models: [__dirname + '/models/**/*.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
  }
})

export { sequelize }
