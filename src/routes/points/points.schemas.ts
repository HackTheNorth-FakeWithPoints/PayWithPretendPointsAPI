import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const memberId = z.object({
  memberId: z.string().openapi({ example: '1' })
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
    params: memberId
  },
  responses: zodHTTPCodeResponses(balance)
}

export { getPointsSwagger }
