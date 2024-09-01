import { WhereOptions } from 'sequelize'

import { Transaction, TransactionCreationAttributes } from '@/db/models/index.ts'

const findTransactions = (where: WhereOptions<Transaction>) => {
  return Transaction.findAll({ where })
}

const findTransaction = (where: WhereOptions<Transaction>) => {
  return Transaction.findOne({ where })
}

const findTransactionById = (id: number) => {
  return Transaction.findByPk(id)
}

const addTransaction = (transaction: TransactionCreationAttributes) => {
  return Transaction.create(transaction)
}

const modifyTransaction = (id: number, partnerId: number, memberId: number, transaction: Partial<Transaction>) => {
  return Transaction.update(transaction, { where: { id, partnerId, memberId }, returning: true })
}

const removeTransaction = (id: number, partnerId: number, memberId: number) => {
  return Transaction.destroy({ where: { id, partnerId, memberId } })
}

export { findTransactions, findTransaction, findTransactionById, addTransaction, modifyTransaction, removeTransaction }
