import express, { type Request, type Response } from 'express'

import {
  deletePartnerController,
  getPartnerController,
  getPartnersController,
  patchPartnerController,
  postPartnerController
} from '@/controllers/partners/index.ts'
import { PartnerCreationAttributes } from '@/db/models/index.ts'
import { adminAuthMiddleware } from '@/middleware/index.ts'
import { patchPartner, postPartner } from '@/routes/partners/index.ts'
import { partnerIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/partners', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const partners = await getPartnersController()

    return res.status(200).json({ partners })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const partner = await getPartnerController(partnerId)

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = postPartner.parse(req.body)

    const partner = await postPartnerController(partnerPayload as PartnerCreationAttributes)

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)
    const partnerPayload = patchPartner.parse(req.body)

    const partner = await patchPartnerController(partnerId, partnerPayload as PartnerCreationAttributes)

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const count = await deletePartnerController(partnerId)

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as partnerRouter }
