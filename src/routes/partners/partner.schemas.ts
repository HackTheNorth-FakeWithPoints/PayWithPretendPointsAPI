import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { PARTNER_PERMISSIONS } from '@/constants/index.ts'
import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const partnerId = z.object({
  partnerId: z.string().openapi({ example: '1' })
})

const postPartner = z.object({
  status: z.string().openapi({ example: 'ACTIVE' }),
  name: z.string().openapi({ example: 'Partner Name' }),
  description: z.string().openapi({ example: 'Partner Description' }),
  contactId: z.number().int().openapi({ example: 1 }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  email: z.string().openapi({ example: 'partner@example.com' }),
  password: z.string().openapi({ example: '******************' }),
  address: z.string().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().openapi({ example: '4161234567' })
})

const patchPartner = z.object({
  status: z.string().optional().openapi({ example: 'ACTIVE' }),
  name: z.string().optional().openapi({ example: 'Partner Name' }),
  description: z.string().optional().openapi({ example: 'Partner Description' }),
  contactId: z.number().int().optional().openapi({ example: 1 }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .optional()
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  email: z.string().optional().openapi({ example: 'partner@example.com' }),
  password: z.string().optional().openapi({ example: '******************' }),
  address: z.string().optional().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().optional().openapi({ example: '4161234567' })
})

const postPartnerSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations'],
  description: 'Create a new partner.',
  request: {
    body: { content: { 'application/json': { schema: postPartner } } }
  },
  responses: zodHTTPCodeResponses(postPartner)
}

const getPartnerDetailsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'Get a specific partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(postPartner)
}

const patchPartnerDetailsSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'Update a specific partner.',
  request: {
    params: partnerId,
    body: { content: { 'application/json': { schema: patchPartner } } }
  },
  responses: zodHTTPCodeResponses(postPartner)
}

const deletePartnerDetailsSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'Delete a specific partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(postPartner)
}

export {
  postPartner,
  patchPartner,
  postPartnerSwagger,
  getPartnerDetailsSwagger,
  patchPartnerDetailsSwagger,
  deletePartnerDetailsSwagger
}
