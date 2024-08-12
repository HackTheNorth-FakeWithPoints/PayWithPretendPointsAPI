import fs from 'fs'
import path from 'path'

import { sequelize } from '@/db/index.ts'
import { runMigrations } from '@/scripts/migrate.ts'

jest.mock('@/db/index.ts', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined),
    query: jest.fn(),
    close: jest.fn().mockResolvedValue(undefined)
  }
}))

describe('Migration Script', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NODE_ENV = 'test'
  })

  afterAll(() => {
    process.env.NODE_ENV = 'development'
  })

  it('should run the example SQL file and handle failure', async () => {
    ;(sequelize.query as jest.Mock).mockImplementation(() => {
      throw new Error('Example SQL query failed')
    })
    await expect(runMigrations()).rejects.toThrow('Example SQL query failed')
    expect(sequelize.authenticate).toHaveBeenCalled()
    const exampleSqlPath = path.join(__dirname, 'example.sql')
    const sql = fs.readFileSync(exampleSqlPath, 'utf8')
    expect(sequelize.query).toHaveBeenCalledWith(sql)

    expect(sequelize.close).toHaveBeenCalled()
  })

  it('should handle migration errors', async () => {
    // Mock query to throw an error
    ;(sequelize.query as jest.Mock).mockRejectedValue(new Error('Migration error'))

    await expect(runMigrations()).rejects.toThrow('Migration error')

    expect(sequelize.authenticate).toHaveBeenCalled()
    expect(sequelize.close).toHaveBeenCalled()
  })
})
