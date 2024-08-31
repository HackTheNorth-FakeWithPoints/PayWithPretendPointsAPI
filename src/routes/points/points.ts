import express, { type Request, type Response } from 'express'

import { findMember } from '@/db/providers/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points/', async (req: Request, res: Response) => {
  try {
    const member = await findMember({ where: { partnerId: req.get('partnerId'), id: parseInt(req.params.memberId) } })

    if (!member) {
      return res.status(404).json({ error: `Member with id of ${req.params.memberId} does not exist!` })
    }

    return res.json({ balance: member?.balance })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as pointsRouter }
