import express, { type Request, type Response } from 'express'

import { findTransaction, findTransactions } from '@/db/providers/transaction.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', async (req: Request, res: Response) => {
  try {
    if ((req.get('partnerId') as string) !== req.params.partnerId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const transactions = await findTransactions({ where: { partnerId: parseInt(req.get('partnerId') as string) } })

    return res.json({ transactions })
  } catch (error) {
    return res.json({ error })
  }
})

router.get('/loyalty/partners/:partnerId/transactions/:transactionId', async (req: Request, res: Response) => {
  try {
    if ((req.get('partnerId') as string) !== req.params.partnerId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const transaction = await findTransaction({
      where: { partnerId: parseInt(req.get('partnerId') as string), id: parseInt(req.params.transactionId) }
    })

    return res.json({ transaction })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as partnerTransactionsRouter }