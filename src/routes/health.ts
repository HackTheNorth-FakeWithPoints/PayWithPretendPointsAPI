import express, { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { sequelize } from '@/db/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    console.log({
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })

    await sequelize.authenticate()

    res.status(StatusCodes.OK).json({ status: 'success', message: 'Database Connection Healthy', error: null })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: 'Database Connection Failed', error })
  }
})

export { router as healthRouter }
