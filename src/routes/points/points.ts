import express, { type Request, type Response } from 'express'

import { findMember } from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import { memberIdSchema } from '@/routes/points/index.ts'
import { NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const member = await findMember({
      partnerId: req.partnerId as number,
      id: memberId
    })

    if (!member) {
      throw new NotFoundError(`Member with id of ${memberId} was not found!`)
    }

    return res.status(200).json({ balance: member.balance })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as pointsRouter }
