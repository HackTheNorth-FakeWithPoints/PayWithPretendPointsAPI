import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { Partner } from '@/db/models/partner.ts'
import { auth } from '@/routes/index.ts'

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = auth.parse(req.body)

    const partner = await Partner.findOne({
      where: {
        email
      }
    })

    if (!partner) {
      return res.status(404).json({ message: `Partner does not exist!` })
    }

    const isPasswordCorrect = await bcrypt.compare(password, partner.password)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: `Incorrect credentials!` })
    }

    const accessToken = jwt.sign({ email, partnerId: partner.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    })

    return res.json({ message: `Successfully authenticated!`, accessToken })
  } catch (error) {
    return res.json({ message: 'An error occurred!', error })
  }
})

export { router as authRouter }
