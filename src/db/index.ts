import { Sequelize } from 'sequelize'

import { SEQUELIZE_CONFIG } from '@/db/config/index.ts'

const sequelize = new Sequelize(SEQUELIZE_CONFIG)

export { sequelize }
export { migrations } from '@/db/migrations/index.ts'
