import express, { type Request, type Response } from 'express'

import { addMember, findMemberById, findMembers, modifyMember, removeMember } from '@/db/providers/index.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { patchMember, postMember } from '@/routes/members/index.ts'
import { InternalServerError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/members', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const members = await findMembers({})

    return res.status(200).json({ members })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const member = await findMemberById(parseInt(req.params.memberId))

    if (!member) {
      throw new NotFoundError(`Member with id of ${req.params.memberId} was not found!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/members', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberPayload = postMember.parse(req.body)

    const member = await addMember(memberPayload)

    if (!member) {
      throw new InternalServerError(`Member could not be created!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberPayload = patchMember.parse(req.body)

    const member = await modifyMember(parseInt(req.params.memberId), memberPayload)

    if (member) {
      throw new InternalServerError(`Member with id of ${req.params.memberId} could not be updated!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const count = await removeMember(parseInt(req.params.memberId))

    if (count === 0) {
      throw new InternalServerError(`No member with id of ${req.params.memberId} was deleted!`)
    }

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as memberRouter }
