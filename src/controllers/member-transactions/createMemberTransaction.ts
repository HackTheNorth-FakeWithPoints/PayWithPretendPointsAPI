import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { addTransaction, findMemberById } from '@/db/providers/index.ts'

async function createMemberTransaction(transactionPayload: TransactionCreationAttributes) {
  const member = await findMemberById(transactionPayload.memberId)

  if (!member) {
    throw new Error('Member not found')
  }

  if (member.balance + transactionPayload.amount < 0) {
    throw new Error('Insufficient balance')
  }

  return addTransaction(transactionPayload)
}

export { createMemberTransaction }
