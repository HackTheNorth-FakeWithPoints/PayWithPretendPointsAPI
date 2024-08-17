import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { auth } from '@/routes/index.ts'

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = auth.parse(req.body)

    const isPasswordCorrect = await bcrypt.compare(password, process.env.RANDOM_HASH as string)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: `Incorrect credentials!` })
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' })

    return res.json({ message: `Successfully authenticated!`, accessToken })
  } catch (error) {
    return res.json({ message: 'An error occurred!', error })
  }
})

export { router as authRouter }
