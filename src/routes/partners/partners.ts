import express, { type Request, type Response } from 'express'

import { addPartner, findPartnerById, findPartners, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { patchPartner, postPartner } from '@/routes/partners/index.ts'

const router = express.Router()

router.get('/loyalty/partners', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const partners = await findPartners({})

    return res.status(200).json({ partners })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.get('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partner = await findPartnerById(parseInt(req.params.partnerId))

    if (!partner) {
      return res.status(404).json({ error: `Partner with id of ${req.params.partnerId} was not found!` })
    }

    return res.status(200).json({ partner })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post('/loyalty/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = postPartner.parse(req.body)

    const partner = await addPartner(partnerPayload)

    if (!partner) {
      return res.status(500).json({ error: `Partner could not be created!` })
    }

    return res.status(200).json({ partner, password: null })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = patchPartner.parse(req.body)

    const partner = await modifyPartner(parseInt(req.params.partnerId), partnerPayload)

    if (!partner) {
      return res.status(500).json({ error: `Partner with id of ${req.params.partnerId} could not be updated!` })
    }

    return res.status(200).json({ partner, password: null })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await removePartner(parseInt(req.params.partnerId))

    if (count === 0) {
      return res.status(500).json({ error: `No partner with id of ${req.params.partnerId} was deleted!` })
    }

    return res.status(200).json({ count })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

export { router as partnerRouter }
