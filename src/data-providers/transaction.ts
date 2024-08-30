import { WhereOptions } from 'sequelize'

import { Transaction } from '@/db/models/index.ts'

const findTransactions = (where: WhereOptions<Transaction>) => {
  return Transaction.findAll({ where })
}

const findTransactionById = (id: number) => {
  return Transaction.findByPk(id)
}

const addTransaction = (transaction: Partial<Transaction>) => {
  return Transaction.create(transaction)
}

const modifyTransaction = (transactionId: number, transaction: Partial<Transaction>) => {
  return Transaction.update(transaction, { where: { transactionId }, returning: true })
}

const removeTransaction = (transactionId: number) => {
  return Transaction.destroy({ where: { transactionId } })
}

export { findTransactions, findTransactionById, addTransaction, modifyTransaction, removeTransaction }
