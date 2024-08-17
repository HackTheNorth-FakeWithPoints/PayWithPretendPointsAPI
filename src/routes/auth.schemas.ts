import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { routePrefix } from '@/constants/index.ts'

extendZodWithOpenApi(z)

/*****************************************************************
 * /auth
 */
const auth = z.object({
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' })
})

const authResponse = z.object({
  accessToken: z.string().openapi({ example: 'JWT Token' })
})

const authSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/auth`,
  tags: ['Authentication'],
  description: 'auth into partner account',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: auth
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with auth data.',
      content: {
        'application/json': {
          schema: authResponse
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

export { auth, authResponse, authSwagger }
