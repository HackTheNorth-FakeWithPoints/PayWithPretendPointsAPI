import express, { type Request, type Response } from 'express'

import { addMember, countMembers, findMember, findMembers, modifyMember, removeMember } from '@/db/providers/index.ts'
import { partnerAuthMiddleware } from '@/middleware/index.ts'
import { memberIdSchema, patchMember, postMember } from '@/routes/members/index.ts'
import { InternalServerError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/loyalty/members', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await findMembers({}, req.partnerId as number)

    return res.status(200).json({ members })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const member = await findMember({ id: memberId }, req.partnerId as number)

    if (!member) {
      throw new NotFoundError(`Member with id of ${memberId} was not found!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.post('/loyalty/members', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberCount = await countMembers({ partnerId: req.partnerId as number })

    if (memberCount > parseInt(process.env.MAX_MEMBERS_PER_PARTNER as string)) {
      throw new InternalServerError(`Maximum number of members reached for this partner!`)
    }

    const memberPayload = postMember.parse(req.body)

    const member = await addMember({ ...memberPayload, partnerId: req.partnerId as number })

    if (!member) {
      throw new InternalServerError(`Member could not be created!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.patch('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)
    const memberPayload = patchMember.parse(req.body)

    const member = await modifyMember(memberId, req.partnerId as number, memberPayload)

    if (member) {
      throw new InternalServerError(`Member with id of ${memberId} could not be updated!`)
    }

    return res.status(200).json({ member })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.delete('/loyalty/members/:memberId', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { memberId } = memberIdSchema.parse(req.params)

    const count = await removeMember(memberId, req.partnerId as number)

    if (count === 0) {
      throw new InternalServerError(`No member with id of ${memberId} was deleted!`)
    }

    return res.status(200).json({ count })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as memberRouter }
