import express, { type Request, type Response } from 'express'

import { sequelize } from '@/db/index.ts'
import { healthResponseSchema } from '@/routes/health.schemas.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    const { data = {} } = healthResponseSchema.safeParse({
      status: 'SUCCESS',
      message: 'Database Connection Healthy',
      error: null
    })

    res.json(data)
  } catch (error) {
    const { data = {} } = healthResponseSchema.safeParse({
      status: 'ERROR',
      message: 'Database Connection Failed',
      error: (error as Record<string, unknown>)?.message || 'Unknown Error'
    })

    res.json(data)
  }
})

export { router as healthRouter }
