import express, { type Request, type Response } from 'express'

import { createMemberTransaction, updateMemberBalance } from '@/controllers/index.ts'
import {
  countTransactions,
  findMember,
  findTransaction,
  findTransactions,
  modifyTransaction,
  removeTransaction
} from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import {
  memberIdSchema,
  memberIdTransactionIdSchema,
  patchTransaction,
  postTransaction
} from '@/routes/member-transactions/index.ts'
import { InternalServerError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const transactions = await findTransactions({
      memberId,
      partnerId: req.partnerId as number
    })

    return res.status(200).json({ transactions })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)

      const transaction = await findTransaction({
        id: transactionId,
        memberId,
        partnerId: req.partnerId as number
      })

      if (!transaction) {
        throw new NotFoundError(`Transaction with id of ${req.params.transactionId} not found!`)
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

router.post('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const transactionCount = await countTransactions({ memberId, partnerId: req.partnerId as number })

    if (transactionCount > parseInt(process.env.MAX_TRANSACTIONS_PER_MEMBER as string)) {
      throw new InternalServerError(`Maximum number of transactions reached for this member!`)
    }

    const member = await findMember({ id: memberId }, req.partnerId as number)

    if (!member) {
      throw new NotFoundError(`Unable to create a transaction for member with id of ${memberId}!`)
    }

    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await createMemberTransaction({
      ...transactionPayload,
      memberId,
      partnerId: req.partnerId as number
    })

    if (!transaction) {
      throw new InternalServerError('Transaction could not be created!')
    }

    await updateMemberBalance(transaction)

    return res.status(200).json({ transaction })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)
      const transactionPayload = patchTransaction.parse(req.body)

      const transaction = await modifyTransaction(transactionId, req.partnerId as number, memberId, {
        ...transactionPayload
      })

      if (transaction) {
        return res
          .status(500)
          .json({ error: `Transaction with id of ${req.params.transactionId} could not be updated!` })
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

router.delete(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)

      const count = await removeTransaction(transactionId, req.partnerId as number, memberId)

      if (count === 0) {
        throw new InternalServerError(`No transaction with id of ${req.params.transactionId} was deleted!`)
      }

      return res.status(200).json({ count })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

export { router as memberTransactionRouter }
