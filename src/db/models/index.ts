import { readdirSync } from 'fs'
import { basename, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const models: { [key: string]: any } = {}
const modelsDir = __dirname

async function initializeModels() {
  const files = readdirSync(modelsDir).filter((file) => {
    return file.endsWith('.ts') && file !== basename(__filename)
  })

  for (const file of files) {
    const model = await import(join(modelsDir, file))
    const modelName = Object.keys(model)[0]
    models[modelName] = model[modelName]
  }

  for (const modelName in models) {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  }
}

initializeModels()

export { Partner } from '@/db/models/partner.ts'
export { Member } from '@/db/models/member.ts'
export { Transaction } from '@/db/models/transaction.ts'
