import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { postAdminAuth } from '@/routes/auth/index.ts'
import { ForbiddenError, NotFoundError, handleError } from '@/utils/errors.ts'

const router = express.Router()

router.post('/admin-auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = postAdminAuth.parse(req.body)

    if (email !== (process.env.JWT_ADMIN_EMAIL as string)) {
      throw new NotFoundError(`Admin with email of ${email} does not exist!`)
    }

    const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

    if (!isPasswordCorrect) {
      throw new ForbiddenError(`Incorrect credentials!`)
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET as string, { expiresIn: '2h' })

    return res.status(200).json({ accessToken })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as adminAuthRouter }
