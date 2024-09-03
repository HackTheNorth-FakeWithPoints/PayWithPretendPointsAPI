import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/routes.ts'
import { zodHTTPCodeResponses, zodIdSchema } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const memberIdSchema = z.object({
  memberId: zodIdSchema
})

const balance = z.object({
  balance: z.number().int().openapi({ example: 1000 })
})

const getPointsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/points`,
  tags: ['Points'],
  description: 'Get the points balance for a specific member.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(balance)
}

export { memberIdSchema, getPointsSwagger }
