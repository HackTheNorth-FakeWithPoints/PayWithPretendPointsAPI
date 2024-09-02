import express, { type Request, type Response } from 'express'

import { sequelize } from '@/db/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    return res.status(200).json({ status: 'SUCCESS', message: 'Database Healthy', error: null })
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', message: 'Database Unreachable', error })
  }
})

export { router as healthRouter }
