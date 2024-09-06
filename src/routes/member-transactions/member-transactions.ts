import express, { type Request, type Response } from 'express'

import {
  deleteMemberTransactionController,
  getMemberTransactionController,
  getMemberTransactionsController,
  patchMemberTransactionController,
  postMemberTransactionController
} from '@/controllers/member-transactions/index.ts'
import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { partnerAuthMiddleware } from '@/middleware/index.ts'
import { patchTransaction, postTransaction } from '@/routes/member-transactions/index.ts'
import { memberIdSchema, memberIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const transactions = await getMemberTransactionsController(req.partnerId as number, memberId)

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

      const transaction = await getMemberTransactionController(req.partnerId as number, memberId, transactionId)

      return res.status(200).json({ transaction })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

router.post('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)
    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await postMemberTransactionController(
      req.partnerId as number,
      memberId,
      transactionPayload as TransactionCreationAttributes
    )

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

      const transaction = await patchMemberTransactionController(
        req.partnerId as number,
        memberId,
        transactionId,
        transactionPayload as TransactionCreationAttributes
      )

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

      const count = await deleteMemberTransactionController(req.partnerId as number, memberId, transactionId)

      return res.status(200).json({ count })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

export { router as memberTransactionRouter }
