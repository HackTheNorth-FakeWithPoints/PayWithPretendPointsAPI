import express, { type Request, type Response } from 'express'

import { Partner } from '@/db/models/index.ts'
import { addPartner, findPartnerById, findPartners, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { partnerIdSchema, patchPartner, postPartner } from '@/routes/partners/index.ts'
import { InternalServerError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/partners', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const partners = await findPartners({})

    return res.status(200).json({ partners })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const partner = await findPartnerById(partnerId)

    if (!partner) {
      throw new NotFoundError(`Partner with id of ${partnerId} was not found!`)
    }

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = postPartner.parse(req.body)

    const partner = (await addPartner(partnerPayload)) as Partial<Partner>

    if (!partner) {
      throw new InternalServerError(`Partner could not be created!`)
    }

    delete partner.password

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)
    const partnerPayload = patchPartner.parse(req.body)

    const partner = (await modifyPartner(partnerId, partnerPayload)) as Partial<Partner>

    if (!partner) {
      throw new InternalServerError(`Partner with id of ${partnerId} could not be updated!`)
    }

    delete partner.password

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const count = await removePartner(partnerId)

    if (count === 0) {
      throw new InternalServerError(`No partner with id of ${partnerId} was deleted!`)
    }

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as partnerRouter }
