import express, { type Request, type Response } from 'express'

import { addPartner, findPartnerById, findTransactions, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { adminAuthMiddleware, authMiddleware } from '@/middleware/index.ts'
import {
  createTxnForMember,
  getPointsBalance,
  getTransactionHistoryByClient,
  getTransactionHistoryByPartner,
  getTxnDetailForPartner,
  getTxnDetailsForMember,
  optionalPartnerData,
  partnerData,
  partnerId,
  putTxnDetailsForMember,
  reverseTxn
} from '@/routes/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points/', authMiddleware, (req: Request, res: Response) => {
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

router.get('/loyalty/:memberId/transactions/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId, memberId } = getTransactionHistoryByClient.parse({
      partnerId: req.partnerId,
      memberId: req.params.memberId
    })

    const transactions = await findTransactions({ memberId: parseInt(memberId), partnerId: parseInt(partnerId) })

    res.json({
      message: `Successfully got transaction history for clientId: ${memberId} by ${partnerId}`,
      transactions
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.post('/loyalty/:memberId/transactions/', authMiddleware, (req: Request, res: Response) => {
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

router.get('/loyalty/:memberId/transactions/:txnId', authMiddleware, (req: Request, res: Response) => {
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

router.delete('/loyalty/:memberId/transactions/:txnId', authMiddleware, (req: Request, res: Response) => {
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

router.put('/loyalty/:memberId/transactions/:txnId', authMiddleware, (req: Request, res: Response) => {
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

router.post('/loyalty/partners/', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = partnerData.parse(req.body)

    const partner = await addPartner(partnerPayload)

    res.json({ message: `Successfully created partner with partnerId: ${partner.id}`, partner })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId: parsedPartnerId } = partnerId.parse({ partnerId: req.params.partnerId })

    const partner = await findPartnerById(parseInt(parsedPartnerId))

    res.json({ message: `Successfully fetched partner with partnerId: ${parsedPartnerId}`, partner })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId: parsedPartnerId } = partnerId.parse({ partnerId: req.params.partnerId })
    const partnerPayload = optionalPartnerData.parse(req.body)

    const [, partner] = await modifyPartner(parseInt(parsedPartnerId), partnerPayload)

    res.json({
      message: `Successfully updated details for partnerId: ${parsedPartnerId}`,
      partner: partner[0]
    })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId: parsedPartnerId } = partnerId.parse({ partnerId: req.params.partnerId })

    const count = await removePartner(parseInt(parsedPartnerId))

    res.json({ message: `Successfully deleted partner with id: ${parsedPartnerId}`, count })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId/transactions', authMiddleware, (req: Request, res: Response) => {
  try {
    const { partnerId } = getTransactionHistoryByPartner.parse({ partnerId: req.params.partnerId })
    res.json({ message: `Successfully got transaction history for partnerId: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

router.get('/loyalty/partners/:partnerId/transactions/:txnId', authMiddleware, (req: Request, res: Response) => {
  try {
    const { partnerId, txnId } = getTxnDetailForPartner.parse({
      partnerId: req.params.partnerId,
      txnId: req.params.txnId
    })
    res.json({ message: `Successfully got transaction details for txnId: ${txnId} on partnerId: ${partnerId}` })
  } catch (error) {
    res.json({ message: 'An error occurred!', error })
  }
})

export { router as loyaltyRouter }
