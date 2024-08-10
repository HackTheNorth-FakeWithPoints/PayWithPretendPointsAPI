import express, { type Request, type Response } from 'express'

const router = express.Router()

router.post('/loyalty/points/transfer', (_: Request, res: Response) => {
  res.send('Points transferred!')
})

router.post('/loyalty/points/payWithPoints', (_: Request, res: Response) => {
  res.send('Paid with points!')
})

router.post('/loyalty/points/convert', (_: Request, res: Response) => {
  res.send('Points converted!')
})

router.post('/loyalty/points/convert/calculatePoints', (_: Request, res: Response) => {
  res.send('Calculated points!')
})

router.get('/rewards/api/client/accounts/:accountId/transactionHistory', (req: Request, res: Response) => {
  const { accountId = null } = req.params

  res.send(`Transaction history for account ${accountId}!`)
})

router.get('/rewards/api/client/accounts/:accountId/transactionDetail/:referenceId', (req: Request, res: Response) => {
  const { accountId = null, referenceId = null } = req.params

  res.send(`Transaction detail for account ${accountId} with reference ${referenceId}!`)
})

export { router as loyaltyRouter }
