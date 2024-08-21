import { Sequelize } from 'sequelize-typescript'

import { SEQUELIZE_CONFIG } from '@/db/config/config.ts'

const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  models: ['/models/**/*.ts']
})

export { sequelize }
