import express, { type Request, type Response } from 'express'

import { addMember, findMemberById, findMembers, modifyMember, removeMember } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { patchMember, postMember } from '@/routes/members/index.ts'

const router = express.Router()

router.get('/loyalty/members', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const members = await findMembers({})

    return res.status(200).json({ members })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.get('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const member = await findMemberById(parseInt(req.params.memberId))

    if (!member) {
      return res.status(404).json({ error: `Member with id of ${req.params.memberId} was not found!` })
    }

    return res.status(200).json({ member })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.post('/loyalty/members', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberPayload = postMember.parse(req.body)

    const member = await addMember(memberPayload)

    if (!member) {
      return res.status(500).json({ error: `Member could not be created!` })
    }

    return res.status(200).json({ member })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.patch('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberPayload = patchMember.parse(req.body)

    const member = await modifyMember(parseInt(req.params.memberId), memberPayload)

    if (member) {
      return res.status(500).json({ error: `Member with id of ${req.params.memberId} could not be updated!` })
    }

    return res.status(200).json({ member })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

router.delete('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await removeMember(parseInt(req.params.memberId))

    if (count === 0) {
      return res.status(500).json({ error: `No member with id of ${req.params.memberId} was deleted!` })
    }

    return res.status(200).json({ count })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

export { router as memberRouter }
