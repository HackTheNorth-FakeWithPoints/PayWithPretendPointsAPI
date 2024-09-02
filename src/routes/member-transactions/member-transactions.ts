import express, { type Request, type Response } from 'express'

import { createMemberTransaction, updateMemberBalance } from '@/controllers/index.ts'
import { findTransaction, findTransactions, modifyTransaction, removeTransaction } from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import { patchTransaction, postTransaction } from '@/routes/member-transactions/index.ts'
import { InternalServerError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await findTransactions({
      memberId: parseInt(req.params.memberId),
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
      const transaction = await findTransaction({
        id: parseInt(req.params.transactionId),
        memberId: parseInt(req.params.memberId),
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
    const transactionPayload = postTransaction.parse(req.body)

    const memberId = parseInt(req.params.memberId)
    const partnerId = req.partnerId as number

    const transaction = await createMemberTransaction({ ...transactionPayload, memberId, partnerId })

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
      handleError(error as Error, res)
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
        throw new InternalServerError(`No transaction with id of ${req.params.transactionId} was deleted!`)
      }

      return res.status(200).json({ count })
    } catch (error) {
      handleError(error as Error, res)
    }
  }
)

export { router as memberTransactionRouter }
