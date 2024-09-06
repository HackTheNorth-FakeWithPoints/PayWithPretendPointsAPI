import express, { type Request, type Response } from 'express'

import { healthController } from '@/controllers/health/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    const isHealthy = await healthController()

    return res.status(200).json({ status: 'SUCCESS', message: 'Database Healthy', error: isHealthy })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as healthRouter }
