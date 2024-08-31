import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { serve, setup } from 'swagger-ui-express'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { adminAuthMiddleware } from '@/middleware/admin-auth.ts'
import { partnerAuthMiddleware } from '@/middleware/partner-auth.ts'
import { rateLimiter } from '@/middleware/rate-limit.ts'
import { serverHeaders } from '@/middleware/server-headers.ts'
import { adminAuthRouter, partnerAuthRouter } from '@/routes/auth/index.ts'
import { healthRouter } from '@/routes/health/index.ts'
import { memberTransactionRouter } from '@/routes/member-transactions/index.ts'
import { partnerTransactionsRouter } from '@/routes/partner-transactions/index.ts'
import { partnerRouter } from '@/routes/partners/index.ts'
import { pointsRouter } from '@/routes/points/index.ts'
import swaggerJSON from '@/swagger/oas.json'

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(serverHeaders)
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(`${ROUTE_PREFIX}`, healthRouter)
app.use(`${ROUTE_PREFIX}`, adminAuthRouter)
app.use(`${ROUTE_PREFIX}`, partnerAuthRouter)
app.use(`${ROUTE_PREFIX}`, adminAuthMiddleware, partnerRouter)
app.use(`${ROUTE_PREFIX}`, partnerAuthMiddleware, pointsRouter)
app.use(`${ROUTE_PREFIX}`, partnerAuthMiddleware, memberTransactionRouter)
app.use(`${ROUTE_PREFIX}`, partnerAuthMiddleware, partnerTransactionsRouter)

app.use(
  `/`,
  serve,
  setup(swaggerJSON, {
    customSiteTitle: 'Pay With Pretend Points API',
    swaggerOptions: {
      operationsSorter: (a: { get: (arg0: string) => string }, b: { get: (arg0: string) => string }) => {
        const methodsOrder = ['get', 'post', 'patch', 'delete']
        const result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'))
        const comparedResult = result === 0 ? a.get('path').localeCompare(b.get('path')) : result
        return comparedResult
      }
    }
  })
)

export { app }
