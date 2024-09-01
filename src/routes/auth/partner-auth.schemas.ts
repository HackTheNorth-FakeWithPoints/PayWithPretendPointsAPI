import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const postPartnerAuth = z.object({
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' })
})

const postPartnerAuthResponse = z.object({
  accessToken: z.string().openapi({ example: 'JWT Token' })
})

const postPartnerAuthSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/auth`,
  tags: ['Authentication'],
  description: 'Login to a partner.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: postPartnerAuth
        }
      }
    }
  },
  responses: zodHTTPCodeResponses(postPartnerAuthResponse)
}

export { postPartnerAuth, postPartnerAuthResponse, postPartnerAuthSwagger }
