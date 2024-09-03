import { Transaction as SequelizeTransaction } from 'sequelize'

import { sequelize } from '@/db/index.ts'

const runAsTransaction = (callback: (...args: unknown[]) => unknown) => {
  return sequelize.transaction(callback as (transaction: SequelizeTransaction) => Promise<unknown>)
}

export { runAsTransaction }
