import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { findMember, modifyMember } from '@/db/providers/index.ts'
import { InternalServerError } from '@/utils/errors.ts'

async function updateMemberBalance(transaction: TransactionCreationAttributes) {
  const member = await findMember({ id: transaction.memberId }, transaction.partnerId)

  if (!member) {
    throw new InternalServerError('Member not found')
  }

  return modifyMember(transaction.memberId, transaction.partnerId, {
    ...member,
    balance: transaction.amount + member.balance
  })
}
export { updateMemberBalance }
