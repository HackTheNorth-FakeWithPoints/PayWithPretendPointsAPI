import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const postAdminAuth = z.object({
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' })
})

const postAdminAuthResponse = z.object({
  accessToken: z.string().openapi({ example: 'JWT Token' })
})

const postAdminAuthSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/admin-auth`,
  tags: ['Authentication'],
  description: 'Login as an administrator.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: postAdminAuth
        }
      }
    }
  },
  responses: zodHTTPCodeResponses(postAdminAuthResponse)
}

export { postAdminAuth, postAdminAuthResponse, postAdminAuthSwagger }
