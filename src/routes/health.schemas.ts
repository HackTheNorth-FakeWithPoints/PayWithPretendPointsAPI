import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

/*****************************************************************
 * /health
 */
const healthResponseSchema = z.object({
  status: z.string().openapi({ example: 'SUCCESS' }),
  message: z.string().openapi({ example: 'Database Connection Healthy' }),
  error: z.null().or(z.object({})).or(z.any()).openapi({ example: null })
})

const healthPathOpenApiConfig: RouteConfig = {
  method: 'get',
  path: '/health',
  description: 'Returns the status of the database connection.',
  responses: {
    200: {
      description: 'Object with database success status information.',
      content: {
        'application/json': {
          schema: healthResponseSchema
        }
      }
    },
    500: {
      description: 'Object with database error status information.',
      content: {
        'application/json': {
          schema: healthResponseSchema
        }
      }
    }
  }
}

export { healthResponseSchema, healthPathOpenApiConfig }
