import fs from 'fs'
import path from 'path'

const migrationDir = path.resolve('./src/db/migrations')

const migrations: { [key: string]: string } = {}

fs.readdirSync(migrationDir).forEach((file) => {
  if (file.endsWith('.sql')) {
    const migrationName = path.basename(file, '.sql')
    const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8')
    migrations[migrationName] = sql
  }
})
export { migrations }
