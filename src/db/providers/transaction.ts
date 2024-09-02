import { WhereOptions } from 'sequelize'

import { Transaction, TransactionCreationAttributes } from '@/db/models/index.ts'

const findTransactions = (where: WhereOptions<Transaction>) => {
  return Transaction.findAll({ where, raw: true })
}

const findTransaction = (where: WhereOptions<Transaction>) => {
  return Transaction.findOne({ where, raw: true })
}

const findTransactionById = (id: number) => {
  return Transaction.findByPk(id, { raw: true })
}

const addTransaction = (transaction: TransactionCreationAttributes) => {
  return Transaction.create(transaction, { raw: true }).then((transaction) => transaction.get({ plain: true }))
}

const modifyTransaction = (id: number, partnerId: number, memberId: number, transaction: Partial<Transaction>) => {
  return Transaction.update(transaction, { where: { id, partnerId, memberId }, returning: true }).then(
    ([, transactions]) => {
      return transactions?.[0]?.get({ plain: true }) as Transaction
    }
  )
}

const removeTransaction = (id: number, partnerId: number, memberId: number) => {
  return Transaction.destroy({ where: { id, partnerId, memberId } })
}

export { findTransactions, findTransaction, findTransactionById, addTransaction, modifyTransaction, removeTransaction }
