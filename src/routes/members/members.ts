import express, { type Request, type Response } from 'express'

import {
  deleteMemberController,
  getMemberController,
  getMembersController,
  patchMemberController,
  postMemberController
} from '@/controllers/members/index.ts'
import { MemberCreationAttributes } from '@/db/models/member.ts'
import { partnerAuthMiddleware } from '@/middleware/index.ts'
import { memberIdSchema, patchMember, postMember } from '@/routes/members/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/members', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await getMembersController(req.partnerId as number)

    return res.status(200).json({ members })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const member = await getMemberController(req.partnerId as number, memberId)

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/members', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberPayload = postMember.parse(req.body)

    const member = await postMemberController(req.partnerId as number, memberPayload as MemberCreationAttributes)

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)
    const memberPayload = patchMember.parse(req.body)

    const member = await patchMemberController(
      req.partnerId as number,
      memberId,
      memberPayload as MemberCreationAttributes
    )

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const count = await deleteMemberController(req.partnerId as number, memberId)

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as memberRouter }
