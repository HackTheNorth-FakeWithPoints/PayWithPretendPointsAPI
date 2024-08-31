import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { postAdminAuth } from '@/routes/auth/index.ts'

const router = express.Router()

router.post('/admin-auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = postAdminAuth.parse(req.body)

    const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

    if (!isPasswordCorrect) {
      return res.status(403).json({ error: `Incorrect credentials!` })
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET as string, { expiresIn: '2h' })

    return res.json({ accessToken })
  } catch (error) {
    return res.json({ error })
  }
})

export { router as adminAuthRouter }
