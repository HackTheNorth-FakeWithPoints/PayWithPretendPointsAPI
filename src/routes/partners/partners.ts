import express, { type Request, type Response } from 'express'

import { addPartner, findPartnerById, findPartners, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { patchPartner, postPartner } from '@/routes/partners/index.ts'
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
    const partner = await findPartnerById(parseInt(req.params.partnerId))

    if (!partner) {
      throw new NotFoundError(`Partner with id of ${req.params.partnerId} was not found!`)
    }

    return res.status(200).json({ partner })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = postPartner.parse(req.body)

    const partner = await addPartner(partnerPayload)

    if (!partner) {
      throw new InternalServerError(`Partner could not be created!`)
    }

    return res.status(200).json({ partner, password: null })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partnerPayload = patchPartner.parse(req.body)

    const partner = await modifyPartner(parseInt(req.params.partnerId), partnerPayload)

    if (!partner) {
      throw new InternalServerError(`Partner with id of ${req.params.partnerId} could not be updated!`)
    }

    return res.status(200).json({ partner, password: null })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await removePartner(parseInt(req.params.partnerId))

    if (count === 0) {
      throw new InternalServerError(`No partner with id of ${req.params.partnerId} was deleted!`)
    }

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as partnerRouter }
