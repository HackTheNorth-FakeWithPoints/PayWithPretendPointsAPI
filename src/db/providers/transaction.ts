import { WhereOptions } from 'sequelize'

import { Transaction, TransactionCreationAttributes } from '@/db/models/index.ts'

const findTransactions = (where: WhereOptions<Transaction>) => {
  return Transaction.findAll({ where })
}

const findTransactionById = (id: number) => {
  return Transaction.findByPk(id)
}

const addTransaction = (transaction: TransactionCreationAttributes) => {
  return Transaction.create(transaction)
}

const modifyTransaction = (id: number, transaction: Partial<Transaction>) => {
  return Transaction.update(transaction, { where: { id }, returning: true })
}

const removeTransaction = (id: number) => {
  return Transaction.destroy({ where: { id } })
}

export { findTransactions, findTransactionById, addTransaction, modifyTransaction, removeTransaction }
