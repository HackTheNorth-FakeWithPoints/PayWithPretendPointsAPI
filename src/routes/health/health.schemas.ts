import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const getHealthResponse = z.object({
  status: z.string().openapi({ example: 'SUCCESS' }),
  message: z.string().openapi({ example: 'Database Healthy' }),
  error: z
    .null()
    .or(z.object({}))
    .or(z.any())
    .openapi({ examples: [null, {}] })
})

const getHealthSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/health`,
  tags: ['Status'],
  description: 'Returns the status of the database connection.',
  responses: zodHTTPCodeResponses(getHealthResponse)
}

export { getHealthResponse, getHealthSwagger }
