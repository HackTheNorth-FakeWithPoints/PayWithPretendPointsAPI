import { addTransaction, findMemberById } from '@/db/providers/index.ts'
import { postTransaction } from '@/routes/member-transactions/index.ts'

// Adjust the function signature to accept specific arguments
async function createMemberTransaction(memberId: number, partnerId: number, transactionPayload: unknown) {
  const member = await findMemberById(memberId)

  if (!member) {
    throw new Error('Member not found')
  }

  const validatedPayload = postTransaction.parse(transactionPayload)

  const balance = typeof member.balance === 'string' ? parseFloat(member.balance) : member.balance

  if (balance + validatedPayload.amount < 0) {
    throw new Error('Insufficient balance')
  }

  return addTransaction({
    ...validatedPayload,
    memberId,
    partnerId
  })
}

export { createMemberTransaction }
