import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { adminAuth } from '@/routes/index.ts'

const router = express.Router()

router.post('/admin-auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = adminAuth.parse(req.body)

    const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: `Incorrect credentials!` })
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_ADMIN_SECRET as string, { expiresIn: '1h' })

    return res.json({ message: `Successfully authenticated!`, accessToken })
  } catch (error) {
    return res.json({ message: 'An error occurred!', error })
  }
})

export { router as adminAuthRouter }
