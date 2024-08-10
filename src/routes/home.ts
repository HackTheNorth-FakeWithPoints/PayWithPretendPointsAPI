import express, { type Request, type Response } from 'express'

const router = express.Router()

router.get('/', (_: Request, res: Response) => {
  res.send('Welcome to the Loyalty and Rewards API')
})

export { router as homeRouter }
