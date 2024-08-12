import fs from 'fs'
import path from 'path'

import { sequelize } from '@/db/index.ts'
import { migrations } from '@/db/migrations/index.ts'
import { logger } from '@/logger/index.ts'

export async function runMigrations() {
  try {
    await sequelize.authenticate()
    logger.info('Database connection established.')
    if (process.env.NODE_ENV === 'test') {
      const exampleSqlPath = path.join(__dirname, '../__tests__/example.sql')
      const sql = fs.readFileSync(exampleSqlPath, 'utf8')
      await sequelize.query(sql)
      logger.info('Example SQL file executed successfully.')
    } else {
      for (const [name, sql] of Object.entries(migrations)) {
        await sequelize.query(sql)
        logger.info(`Executed migration: ${name}`)
      }
    }
  } catch (error) {
    logger.error('Migration failed:', error)
    throw error
  } finally {
    await sequelize.close()
  }
}
