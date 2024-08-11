import express, { type Request, type Response } from 'express'

import { sequelize } from '@/db/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    res.json({
      status: 'SUCCESS',
      message: 'Database Connection Healthy',
      error: null
    })
  } catch (error) {
    res.json({
      status: 'ERROR',
      message: 'Database Connection Failed',
      error: (error as Record<string, unknown>)?.message || 'Unknown Error'
    })
  }
})

export { router as healthRouter }
