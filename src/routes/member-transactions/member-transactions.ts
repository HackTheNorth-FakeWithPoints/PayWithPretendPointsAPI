import express, { type Request, type Response } from 'express'

import { createMemberTransaction, updateMemberBalance } from '@/controllers/index.ts'
import { findTransaction, findTransactions, modifyTransaction, removeTransaction } from '@/db/providers/index.ts'
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
    return res.status(500).json({ error })
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
      return res.status(500).json({ error })
    }
  }
)

router.post('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactionPayload = postTransaction.parse(req.body)

    const memberId = parseInt(req.params.memberId)
    const partnerId = req.partnerId as number

    const transaction = await createMemberTransaction({ ...transactionPayload, memberId, partnerId })

    if (!transaction) {
      return res.status(500).json({ error: `Transaction could not be created!` })
    }

    await updateMemberBalance(transaction)

    return res.status(200).json({ transaction })
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unexpected error occurred.'
    return res.status(500).json({ error: errorMessage })
  }
})

router.patch(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const transactionPayload = patchTransaction.parse(req.body)

      const [, transactions] = await modifyTransaction(
        parseInt(req.params.transactionId),
        req.partnerId as number,
        parseInt(req.params.memberId),
        {
          ...transactionPayload
        }
      )

      if (transactions.length === 0) {
        return res
          .status(500)
          .json({ error: `Transaction with id of ${req.params.transactionId} could not be updated!` })
      }

      return res.status(200).json({ transaction: transactions[0] })
    } catch (error) {
      return res.status(500).json({ error })
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
      return res.status(500).json({ error })
    }
  }
)

export { router as memberTransactionRouter }
