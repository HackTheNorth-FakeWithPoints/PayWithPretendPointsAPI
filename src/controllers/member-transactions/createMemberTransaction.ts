import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { addTransaction, findMemberById } from '@/db/providers/index.ts'
import { InternalServerError, ValidationError } from '@/utils/errors.ts'

async function createMemberTransaction(transactionPayload: TransactionCreationAttributes) {
  const member = await findMemberById(transactionPayload.memberId)

  if (!member) {
    throw new InternalServerError('Member not found')
  }

  if (member.balance + transactionPayload.amount < 0) {
    throw new ValidationError('Insufficient balance')
  }

  return addTransaction(transactionPayload)
}

export { createMemberTransaction }
