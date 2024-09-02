import express, { type Request, type Response } from 'express'

import { sequelize } from '@/db/index.ts'
import { handleError } from '@/utils/errors.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    return res.status(200).json({ status: 'SUCCESS', message: 'Database Healthy', error: null })
  } catch (error) {
    handleError(error as Error, res)
  }
})

export { router as healthRouter }
