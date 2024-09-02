import express, { type Request, type Response } from 'express'

import {
  addTransaction,
  findTransaction,
  findTransactions,
  modifyTransaction,
  removeTransaction
} from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import { patchTransaction, postTransaction } from '@/routes/member-transactions/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await findTransactions({
      memberId: parseInt(req.params.memberId),
      partnerId: req.partnerId as number
    })

    return res.status(200).json({ transactions })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.get(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const transaction = await findTransaction({
        id: parseInt(req.params.transactionId),
        memberId: parseInt(req.params.memberId),
        partnerId: req.partnerId as number
      })

      if (!transaction) {
        return res.status(404).json({ error: `Transaction with id of ${req.params.transactionId} not found!` })
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
    }
  }
)

router.post('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await addTransaction({
      ...transactionPayload,
      memberId: parseInt(req.params.memberId),
      partnerId: req.partnerId as number
    })

    if (!transaction) {
      return res.status(500).json({ error: `Transaction could not be created!` })
    }

    return res.status(200).json({ transaction })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.patch(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const transactionPayload = patchTransaction.parse(req.body)

      const transaction = await modifyTransaction(
        parseInt(req.params.transactionId),
        req.partnerId as number,
        parseInt(req.params.memberId),
        {
          ...transactionPayload
        }
      )

      if (transaction) {
        return res
          .status(500)
          .json({ error: `Transaction with id of ${req.params.transactionId} could not be updated!` })
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
    }
  }
)

router.delete(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const count = await removeTransaction(
        parseInt(req.params.transactionId),
        req.partnerId as number,
        parseInt(req.params.memberId)
      )

      if (count === 0) {
        return res.status(500).json({ error: `No transaction with id of ${req.params.transactionId} was deleted!` })
      }

      return res.status(200).json({ count })
    } catch (error) {
      return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
    }
  }
)

export { router as memberTransactionRouter }
