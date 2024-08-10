import express, { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { sequelize } from '@/db/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    res.status(StatusCodes.OK).json({ status: 'success', message: 'Database Connection Healthy', error: null })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: 'Database Connection Failed', error })
  }
})

export { router as healthRouter }
