import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { serve, setup } from 'swagger-ui-express'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { rateLimiter } from '@/middleware/rate-limit.ts'
import { adminAuthRouter, authRouter, healthRouter, loyaltyRouter } from '@/routes/index.ts'
import swaggerJSON from '@/swagger/oas.json'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(`${ROUTE_PREFIX}`, healthRouter)
app.use(`${ROUTE_PREFIX}`, authRouter)
app.use(`${ROUTE_PREFIX}`, adminAuthRouter)
app.use(`${ROUTE_PREFIX}`, loyaltyRouter)
app.use(
  `/`,
  serve,
  setup(swaggerJSON, {
    customSiteTitle: 'Pay With Pretend Points API'
  })
)

export { app }
