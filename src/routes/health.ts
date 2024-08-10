import express, { type Request, type Response } from 'express'

import { sequelize } from '@/db/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    res.json({ status: 'success', message: 'Database Connection Healthy', error: null })
  } catch (error) {
    res.json({ status: 'error', message: 'Database Connection Failed', error })
  }
})

export { router as healthRouter }
