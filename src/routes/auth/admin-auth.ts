import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { postAdminAuth } from '@/routes/auth/index.ts'

const router = express.Router()

router.post('/admin-auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = postAdminAuth.parse(req.body)

    if (email !== (process.env.JWT_ADMIN_EMAIL as string)) {
      return res.status(404).json({ error: `Admin with email of ${email} does not exist!` })
    }

    const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

    if (!isPasswordCorrect) {
      return res.status(403).json({ error: `Incorrect credentials!` })
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET as string, { expiresIn: '2h' })

    return res.status(200).json({ accessToken })
  } catch (error) {
    return res.status(500).json({ error: (error as Error)?.message || 'An unexpected error occurred!' })
  }
})

export { router as adminAuthRouter }
