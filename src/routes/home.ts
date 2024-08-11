import express, { type Request, type Response } from 'express'

import { homeResponseSchema } from '@/routes/home.schemas.ts'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  const { data = {} } = homeResponseSchema.safeParse({
    message: 'Welcome to the Loyalty and Rewards API!'
  })

  res.json(data)
})

export { router as homeRouter }
