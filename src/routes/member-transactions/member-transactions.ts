import express, { type Request, type Response } from 'express'

import {
  addTransaction,
  findTransaction,
  findTransactions,
  modifyTransaction,
  removeTransaction
} from '@/db/providers/index.ts'
import { patchTransaction, postTransaction } from '@/routes/member-transactions/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions/', async (req: Request, res: Response) => {
  try {
    const transactions = await findTransactions({
      memberId: parseInt(req.params.memberId),
      partnerId: parseInt(req.get('partnerId') as string)
    })

    res.json({
      transactions
    })
  } catch (error) {
    return res.json({ error })
  }
})

router.get('/loyalty/:memberId/transactions/:transactionId', async (req: Request, res: Response) => {
  try {
    const transaction = await findTransaction({
      id: parseInt(req.params.transactionId),
      memberId: parseInt(req.params.memberId),
      partnerId: parseInt(req.get('partnerId') as string)
    })

    return res.json({ transaction })
  } catch (error) {
    return res.json({ error })
  }
})

router.post('/loyalty/:memberId/transactions/', async (req: Request, res: Response) => {
  try {
    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await addTransaction({
      ...transactionPayload,
      memberId: parseInt(req.params.memberId),
      partnerId: parseInt(req.get('partnerId') as string)
    })

    return res.json({ transaction })
  } catch (error) {
    return res.json({ error })
  }
})

router.patch('/loyalty/:memberId/transactions/:transactionId', async (req: Request, res: Response) => {
  try {
    const transactionPayload = patchTransaction.parse(req.body)

    const [, transactions] = await modifyTransaction(
      parseInt(req.params.transactionId),
      parseInt(req.get('partnerId') as string),
      parseInt(req.params.memberId),
      {
        ...transactionPayload
      }
    )

    return res.json({ transaction: transactions[0] })
  } catch (error) {
    return res.json({ error })
  }
})

router.delete('/loyalty/:memberId/transactions/:transactionId', async (req: Request, res: Response) => {
  try {
    const count = await removeTransaction(
      parseInt(req.params.transactionId),
      parseInt(req.get('partnerId') as string),
      parseInt(req.params.memberId)
    )

    return res.json({ count })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as memberTransactionRouter }
