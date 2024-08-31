import express, { type Request, type Response } from 'express'

import { findMember } from '@/db/providers/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points/', async (req: Request, res: Response) => {
  try {
    const member = await findMember({
      where: { partnerId: req.get('partnerId'), id: parseInt(req.params.memberId) }
    })

    return res.json({ balance: member?.balance })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as pointsRouter }
