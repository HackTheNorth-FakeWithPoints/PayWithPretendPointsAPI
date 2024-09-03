import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { findPartner } from '@/db/providers/partners.ts'
import { ForbiddenError, NotFoundError, handleError } from '@/utils/errors.ts'
import { zodCredentials } from '@/utils/zod-common.ts'

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = zodCredentials.parse(req.body)

    const partner = await findPartner({ email }, false)

    if (!partner) {
      throw new NotFoundError(`Partner with email of ${email} does not exist!`)
    }

    const isPasswordCorrect = await bcrypt.compare(password, partner.password)

    if (!isPasswordCorrect) {
      throw new ForbiddenError(`Incorrect credentials!`)
    }

    const accessToken = jwt.sign(partner, process.env.JWT_SECRET as string, {
      expiresIn: '2h'
    })

    return res.status(200).json({ accessToken })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as partnerAuthRouter }
