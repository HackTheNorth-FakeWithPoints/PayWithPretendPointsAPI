import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { rateLimiter } from '@/middleware/index.ts'
import { adminAuthRouter, partnerAuthRouter } from '@/routes/auth/index.ts'
import { healthRouter } from '@/routes/health/index.ts'
import { memberTransactionRouter } from '@/routes/member-transactions/index.ts'
import { memberRouter } from '@/routes/members/index.ts'
import { partnerTransactionsRouter } from '@/routes/partner-transactions/index.ts'
import { partnerRouter } from '@/routes/partners/index.ts'
import { pointsRouter } from '@/routes/points/index.ts'

const app = express()

app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

app.use(rateLimiter)
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(`${ROUTE_PREFIX}`, healthRouter)
app.use(`${ROUTE_PREFIX}`, adminAuthRouter)
app.use(`${ROUTE_PREFIX}`, partnerAuthRouter)
app.use(`${ROUTE_PREFIX}`, partnerRouter)
app.use(`${ROUTE_PREFIX}`, memberRouter)
app.use(`${ROUTE_PREFIX}`, pointsRouter)
app.use(`${ROUTE_PREFIX}`, memberTransactionRouter)
app.use(`${ROUTE_PREFIX}`, partnerTransactionsRouter)

export { app }
