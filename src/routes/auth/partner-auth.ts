import express, { type Request, type Response } from 'express'

import { partnerAuthController } from '@/controllers/auth/index.ts'
import { handleError, zodCredentials } from '@/utils/index.ts'

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = zodCredentials.parse(req.body)

    const accessToken = await partnerAuthController(email, password)

    return res.status(200).json({ accessToken })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as partnerAuthRouter }
