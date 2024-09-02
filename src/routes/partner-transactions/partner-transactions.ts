import express, { type Request, type Response } from 'express'

import { findTransaction, findTransactions } from '@/db/providers/transaction.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import { NotFoundError, UnauthorizedError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    if (req.partnerId?.toString() !== req.params.partnerId) {
      throw new UnauthorizedError('Unauthorized')
    }

    const transactions = await findTransactions({ partnerId: req.partnerId })

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
      if (req.partnerId?.toString() !== req.params.partnerId) {
        throw new UnauthorizedError('Unauthorized')
      }

      const transaction = await findTransaction({
        partnerId: req.partnerId,
        id: parseInt(req.params.transactionId)
      })

      if (!transaction) {
        throw new NotFoundError(`Transaction with id of ${req.params.transactionId} was not found!`)
      }

      return res.status(200).json({ transaction })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

export { router as partnerTransactionsRouter }
