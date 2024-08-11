import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { routePrefix } from '@/constants/route-prefix.ts'

extendZodWithOpenApi(z)

/*****************************************************************
 * /health
 */
const healthSchema = z.object({
  status: z.string().openapi({ examples: ['SUCCESS', 'ERROR'] }),
  message: z.string().openapi({ examples: ['Database Connection Healthy', 'Database Connection Failed'] }),
  error: z
    .null()
    .or(z.object({}))
    .or(z.any())
    .openapi({ examples: [null, {}] })
})

const healthSwagger: RouteConfig = {
  method: 'get',
  path: `${routePrefix}/health`,
  tags: ['Status'],
  description: 'Returns the status of the database connection.',
  responses: {
    200: {
      description: 'Object with database success status information.',
      content: {
        'application/json': {
          schema: healthSchema
        }
      }
    },
    500: {
      description: 'Object with database error status information.',
      content: {
        'application/json': {
          schema: healthSchema
        }
      }
    }
  }
}

export { healthSwagger }
