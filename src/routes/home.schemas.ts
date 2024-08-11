import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

/*****************************************************************
 * /
 */
const homeResponseSchema = z.object({
  message: z.string().openapi({ example: 'Welcome to the Loyalty and Rewards API' })
})

const homePathOpenApiConfig: RouteConfig = {
  method: 'get',
  path: '/',
  description: 'Returns a welcome message for the app.',
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: homeResponseSchema
        }
      }
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

export { homeResponseSchema, homePathOpenApiConfig }
