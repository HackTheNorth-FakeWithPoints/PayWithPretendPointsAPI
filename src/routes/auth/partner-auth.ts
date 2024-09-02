import bcrypt from 'bcryptjs'
import express, { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { findPartner } from '@/db/providers/partners.ts'
import { postPartnerAuth } from '@/routes/auth/index.ts'

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = postPartnerAuth.parse(req.body)

    const partner = await findPartner({ email }, false)

    if (!partner) {
      return res.status(404).json({ error: `Partner with email of ${email} does not exist!` })
    }

    const isPasswordCorrect = await bcrypt.compare(password, partner.password)

    if (!isPasswordCorrect) {
      return res.status(403).json({ error: `Incorrect credentials!` })
    }

    const { id, email: partnerEmail, name, address, phone, description, status, permission } = partner

    const accessToken = jwt.sign(
      { id, email: partnerEmail, name, address, phone, description, status, permission },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '2h'
      }
    )

    return res.status(200).json({ accessToken })
  } catch (error) {
    return res.status(500).json({ error })
  }
})

export { router as partnerAuthRouter }
