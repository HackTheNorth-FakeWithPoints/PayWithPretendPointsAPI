import express, { type Request, type Response } from 'express'

import { addMember, findMemberById, findMembers, modifyMember, removeMember } from '@/db/providers/index.ts'
import { patchMember, postMember } from '@/routes/members/index.ts'

const router = express.Router()

router.get('/loyalty/members', async (_: Request, res: Response) => {
  try {
    const members = await findMembers({})

    return res.json({ members })
  } catch (error) {
    return res.json({ error })
  }
})

router.get('/loyalty/members/:memberId', async (req: Request, res: Response) => {
  try {
    const member = await findMemberById(parseInt(req.params.memberId))

    return res.json({ member })
  } catch (error) {
    return res.json({ error })
  }
})

router.post('/loyalty/members', async (req: Request, res: Response) => {
  try {
    const memberPayload = postMember.parse(req.body)

    const member = await addMember(memberPayload)

    return res.json({ member })
  } catch (error) {
    return res.json({ error })
  }
})

router.patch('/loyalty/members/:memberId', async (req: Request, res: Response) => {
  try {
    const memberPayload = patchMember.parse(req.body)

    const [, members] = await modifyMember(parseInt(req.params.memberId), memberPayload)

    return res.json({ member: members[0] })
  } catch (error) {
    return res.json({ error })
  }
})

router.delete('/loyalty/members/:memberId', async (req: Request, res: Response) => {
  try {
    const count = await removeMember(parseInt(req.params.memberId))

    return res.json({ count })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as memberRouter }
