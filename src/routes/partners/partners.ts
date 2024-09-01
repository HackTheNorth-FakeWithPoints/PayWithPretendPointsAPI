import express, { type Request, type Response } from 'express'

import { addPartner, findPartnerById, findPartners, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { patchPartner, postPartner } from '@/routes/partners/index.ts'

const router = express.Router()

router.get('/loyalty/partners', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const partners = await findPartners({})

    return res.json({ partners })
  } catch (error) {
    return res.json({ error })
  }
})

router.get('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partner = await findPartnerById(parseInt(req.params.partnerId))

    return res.json({ partner })
  } catch (error) {
    return res.json({ error })
  }
})

router.post('/loyalty/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = postPartner.parse(req.body)

    const partner = await addPartner(partnerPayload)

    return res.json({ partner: { ...partner.get({ plain: true }), password: null } })
  } catch (error) {
    return res.json({ error })
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = patchPartner.parse(req.body)

    const [, partners] = await modifyPartner(parseInt(req.params.partnerId), partnerPayload)

    return res.json({ partner: { ...partners[0].get({ plain: true }), password: null } })
  } catch (error) {
    return res.json({ error })
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await removePartner(parseInt(req.params.partnerId))

    return res.json({ count })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as partnerRouter }
