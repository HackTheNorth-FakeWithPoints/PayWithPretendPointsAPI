import 'ts-node/register'

import { SEQUELIZE_CONFIG } from '@/db/config/config.ts'

module.exports = {
  username: SEQUELIZE_CONFIG.username,
  password: SEQUELIZE_CONFIG.password,
  database: SEQUELIZE_CONFIG.database,
  host: SEQUELIZE_CONFIG.host,
  dialect: 'postgres',
  port: 3306
}
