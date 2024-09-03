import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { findMemberById, modifyMember } from '@/db/providers/index.ts'
import { InternalServerError } from '@/utils/errors.ts'

async function updateMemberBalance(transaction: TransactionCreationAttributes) {
  const member = await findMemberById(transaction.memberId)

  if (!member) {
    throw new InternalServerError('Member not found')
  }

  return modifyMember(transaction.memberId, {
    ...member,
    balance: transaction.amount + member.balance
  })
}
export { updateMemberBalance }
