import express, { type Request, type Response } from 'express'

import {
  loyaltyConvertPointsCalculatePointsRequestSchema,
  loyaltyConvertPointsCalculatePointsResponseSchema,
  loyaltyConvertPointsRequestSchema,
  loyaltyConvertPointsResponseSchema,
  loyaltyPayWithPointsRequestSchema,
  loyaltyPayWithPointsResponseSchema,
  loyaltyPointsTransferRequestSchema,
  loyaltyPointsTransferResponseSchema,
  rewardsClientsAccountsTransactionDetailRequestSchema,
  rewardsClientsAccountsTransactionDetailResponseSchema,
  rewardsClientsAccountsTransactionHistoryRequestSchema,
  rewardsClientsAccountsTransactionHistoryResponseSchema
} from '@/routes/index.ts'

const router = express.Router()

router.post('/loyalty/points/transfer', (req: Request, res: Response) => {
  try {
    const { points } = loyaltyPointsTransferRequestSchema.parse(req.body)
    const { data = {} } = loyaltyPointsTransferResponseSchema.safeParse({
      message: `Successfully transferred ${points} points!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/payWithPoints', (req: Request, res: Response) => {
  try {
    const { points } = loyaltyPayWithPointsRequestSchema.parse(req.body)
    const { data = {} } = loyaltyPayWithPointsResponseSchema.safeParse({
      message: `Successfully paid with ${points} points!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/convert', (req: Request, res: Response) => {
  try {
    const { points } = loyaltyConvertPointsRequestSchema.parse(req.body)
    const { data = {} } = loyaltyConvertPointsResponseSchema.safeParse({
      message: `Successfully converted ${points} points!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/points/convert/calculatePoints', (req: Request, res: Response) => {
  try {
    const { points } = loyaltyConvertPointsCalculatePointsRequestSchema.parse(req.body)
    const { data = {} } = loyaltyConvertPointsCalculatePointsResponseSchema.safeParse({
      message: `Successfully calculated ${points} points!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

router.get('/rewards/client/accounts/:accountId/transactionHistory', (req: Request, res: Response) => {
  try {
    const { accountId } = rewardsClientsAccountsTransactionHistoryRequestSchema.parse(req.params)
    const { data = {} } = rewardsClientsAccountsTransactionHistoryResponseSchema.safeParse({
      message: `Transaction history for account id: ${accountId}!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

router.get('/rewards/client/accounts/:accountId/transactionDetail/:referenceId', (req: Request, res: Response) => {
  try {
    const { accountId, referenceId } = rewardsClientsAccountsTransactionDetailRequestSchema.parse(req.params)
    const { data = {} } = rewardsClientsAccountsTransactionDetailResponseSchema.safeParse({
      message: `Transaction detail for account ${accountId} with reference ${referenceId}!`
    })

    res.json(data)
  } catch (error) {
    res.status(400).json({ message: 'An error occurred!', error })
  }
})

export { router as loyaltyRouter }
