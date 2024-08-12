import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { serve, setup } from 'swagger-ui-express'

import { routePrefix } from '@/constants/route-prefix.ts'
import { rateLimiter } from '@/middleware/rate-limit.ts'
import { healthRouter, loyaltyRouter } from '@/routes/index.ts'
import swaggerJSON from '@/swagger/oas.json'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(`${routePrefix}`, healthRouter)
app.use(`${routePrefix}`, loyaltyRouter)
app.use(
  `/`,
  serve,
  setup(swaggerJSON, {
    customSiteTitle: 'Pay With Pretend Points API'
  })
)

export { app }
