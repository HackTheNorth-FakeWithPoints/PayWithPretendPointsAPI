import express, { type Request, type Response } from 'express'

import { findTransaction, findTransactions } from '@/db/providers/transaction.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    if ((req.get('partnerId') as string) !== req.params.partnerId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const transactions = await findTransactions({ partnerId: parseInt(req.get('partnerId') as string) })

    return res.json({ transactions })
  } catch (error) {
    return res.json({ error })
  }
})

router.get(
  '/loyalty/partners/:partnerId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      if ((req.get('partnerId') as string) !== req.params.partnerId) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const transaction = await findTransaction({
        partnerId: parseInt(req.get('partnerId') as string),
        id: parseInt(req.params.transactionId)
      })

      return res.json({ transaction })
    } catch (error) {
      return res.json({ error })
    }
  }
)

export { router as partnerTransactionsRouter }
