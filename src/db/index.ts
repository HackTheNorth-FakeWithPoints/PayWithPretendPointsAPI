import { Sequelize } from 'sequelize-typescript'

import { SEQUELIZE_CONFIG } from '@/db/config/index.ts'

const sequelize = new Sequelize({
  ...SEQUELIZE_CONFIG,
  models: [__dirname + '/models/**/*.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
  }
})

export { sequelize }
