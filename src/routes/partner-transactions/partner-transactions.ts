import express, { type Request, type Response } from 'express'

import {
  getPartnerTransactionController,
  getPartnerTransactionsController
} from '@/controllers/partner-transactions/index.ts'
import { partnerAuthMiddleware } from '@/middleware/index.ts'
import { partnerIdSchema, partnerIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const transactions = await getPartnerTransactionsController(req.partnerId as number, partnerId)

    return res.status(200).json({ transactions })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get(
  '/loyalty/partners/:partnerId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { partnerId, transactionId } = partnerIdTransactionIdSchema.parse(req.params)

      const transaction = await getPartnerTransactionController(req.partnerId as number, partnerId, transactionId)

      return res.status(200).json({ transaction })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

export { router as partnerTransactionsRouter }
