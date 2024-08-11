import express, { type Request, type Response } from 'express'

import {
  calculatePoints,
  convertPoints,
  payWithPoints,
  pointsTransfer,
  transactionDetail,
  transactionHistory
} from '@/routes/index.ts'

const router = express.Router()

router.post('/loyalty/points/transfer', (req: Request, res: Response) => {
  try {
    const { points } = pointsTransfer.parse(req.body)

    res.json({ message: `Successfully transferred ${points} points!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/payWithPoints', (req: Request, res: Response) => {
  try {
    const { points } = payWithPoints.parse(req.body)

    res.json({ message: `Successfully paid with ${points} points!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/convert', (req: Request, res: Response) => {
  try {
    const { points } = convertPoints.parse(req.body)

    res.json({ message: `Successfully converted ${points} points!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/convert/calculatePoints', (req: Request, res: Response) => {
  try {
    const { points } = calculatePoints.parse(req.body)

    res.json({ message: `Successfully calculated ${points} points!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/rewards/client/accounts/:accountId/transactionHistory', (req: Request, res: Response) => {
  try {
    const { accountId } = transactionHistory.parse(req.params)

    res.json({ message: `Transaction history for account id: ${accountId}!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/rewards/client/accounts/:accountId/transactionDetail/:referenceId', (req: Request, res: Response) => {
  try {
    const { accountId, referenceId } = transactionDetail.parse(req.params)

    res.json({ message: `Transaction detail for account ${accountId} with reference ${referenceId}!` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

export { router as loyaltyRouter }
