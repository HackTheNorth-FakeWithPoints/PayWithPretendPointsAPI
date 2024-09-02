import express, { type Request, type Response } from 'express'

import { findMember } from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const member = await findMember({
      partnerId: req.partnerId as number,
      id: parseInt(req.params.memberId)
    })

    if (!member) {
      return res.status(404).json({ error: `Member with id of ${req.params.memberId} was not found!` })
    }

    return res.status(200).json({ balance: member.balance })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

export { router as pointsRouter }
