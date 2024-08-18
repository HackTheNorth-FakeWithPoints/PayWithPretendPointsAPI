import { Sequelize } from 'sequelize-typescript'

// eslint-disable-next-line no-restricted-imports
import { SEQUELIZE_CONFIG } from './config/config.ts'

const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  models: [__dirname + '/models/**/*.ts']
})

export { sequelize }
