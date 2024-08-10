import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { rateLimiter } from '@/middleware/rate-limit.ts'
import { healthRouter, homeRouter, loyaltyRouter } from '@/routes/index.ts'

const routePrefix = '/api/v1'
const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(`${routePrefix}`, homeRouter)
app.use(`${routePrefix}`, healthRouter)
app.use(`${routePrefix}`, loyaltyRouter)

export { app }
