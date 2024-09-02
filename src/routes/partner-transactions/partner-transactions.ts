import express, { type Request, type Response } from 'express'

import { findTransaction, findTransactions } from '@/db/providers/transaction.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    if (req.partnerId?.toString() !== req.params.partnerId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const transactions = await findTransactions({ partnerId: req.partnerId })

    return res.status(200).json({ transactions })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.get(
  '/loyalty/partners/:partnerId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (req.partnerId?.toString() !== req.params.partnerId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const transaction = await findTransaction({
        partnerId: req.partnerId,
        id: parseInt(req.params.transactionId)
      })

      if (!transaction) {
        return res.status(404).json({ error: `Transaction with id of ${req.params.transactionId} was not found!` })
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
    }
  }
)

export { router as partnerTransactionsRouter }
