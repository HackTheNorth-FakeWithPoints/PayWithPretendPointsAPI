import express, { type Request, type Response } from 'express'

import {
  createPartner,
  createTxnForMember,
  deletePartnerDetails,
  getPartnerDetails,
  getPointsBalance,
  getTransactionHistoryByClient,
  getTransactionHistoryByPartner,
  getTxnDetailForPartner,
  getTxnDetailsForMember,
  putTxnDetailsForMember,
  reverseTxn,
  updatePartnerDetails
} from '@/routes/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points/', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId } = getPointsBalance.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId
    })

    res.json({
      message: `Successfully got points for memberId: ${memberId} and partnerId: ${partnerId}`
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/:memberId/transactions/', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId } = getTransactionHistoryByClient.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId
    })
    res.json({ message: `Successfully got transaction history for clientId: ${memberId} by ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/:memberId/transactions/', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId, body } = createTxnForMember.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId,
      body: req.body
    })

    res.json({
      message: `Successfully created transaction for memberId: ${memberId} with amount ${body.txnDescription.amount} by ${partnerId}`
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/:memberId/transactions/:txnId', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId, txnId } = getTxnDetailsForMember.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId,
      txnId: req.params.txnId
    })

    res.json({
      message: `Successfully got transaction details for member ${memberId} with txnId: ${txnId} by ${partnerId}`
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.delete('/loyalty/:memberId/transactions/:txnId', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId, txnId } = reverseTxn.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId,
      txnId: req.params.txnId
    })

    res.json({ message: `Successfully reversed transaction for memberId: ${memberId} with ${txnId} by ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.put('/loyalty/:memberId/transactions/:txnId', (req: Request, res: Response) => {
  try {
    const { partnerId, memberId, txnId, body } = putTxnDetailsForMember.parse({
      partnerId: req.get('partnerId'),
      memberId: req.params.memberId,
      txnId: req.params.txnId,
      body: req.body
    })

    res.json({
      message: `Successfully update transaction for memberId: ${memberId} with ${txnId} that has amount ${body.txnDescription.amount} by ${partnerId}`
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/partners/', (req: Request, res: Response) => {
  try {
    const { partnerId, status, partnerDescription } = createPartner.parse(req.body)

    res.json({
      message: `Successfully created partner with id: ${partnerId} with status: ${status} with content: ${partnerDescription} `
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId', (req: Request, res: Response) => {
  try {
    const { partnerId } = getPartnerDetails.parse({ partnerId: req.params.partnerId })

    res.json({ message: `Successfully got details for partnerId: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.put('/loyalty/partners/:partnerId', (req: Request, res: Response) => {
  try {
    const { partnerId, status, partnerDescription } = updatePartnerDetails.parse({
      partnerId: req.params.partnerId,
      status: req.body.status,
      partnerDescription: req.body.partnerDescription
    })

    res.json({
      message: `Successfully updated details for partnerId: ${partnerId} with status ${status} with description ${partnerDescription}`
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.delete('/loyalty/partners/:partnerId', (req: Request, res: Response) => {
  try {
    const { partnerId } = deletePartnerDetails.parse({ partnerId: req.params.partnerId })
    res.json({ message: `Successfully deleted partner with id: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId/transactions', (req: Request, res: Response) => {
  try {
    const { partnerId } = getTransactionHistoryByPartner.parse({ partnerId: req.params.partnerId })
    res.json({ message: `Successfully got transaction history for partnerId: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId/transactions/:txnId', (req: Request, res: Response) => {
  try {

    const { partnerId,txnId  } = getTxnDetailForPartner.parse({ partnerId: req.params.partnerId, txnId: req.params.txnId })
    res.json({ message: `Successfully got transaction details for txnId: ${txnId} on partnerId: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

export { router as loyaltyRouter }
