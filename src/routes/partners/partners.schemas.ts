import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { PARTNER_PERMISSIONS } from '@/constants/index.ts'
import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { PartnerZod } from '@/db/models/partner.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const partnerId = z.object({
  partnerId: z.string().openapi({ example: '1' })
})

const postPartner = z.object({
  status: z.string().openapi({ example: 'ACTIVE' }),
  name: z.string().openapi({ example: 'Partner Name' }),
  description: z.string().openapi({ example: 'Partner Description' }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  email: z.string().openapi({ example: 'partner@example.com' }),
  password: z.string().openapi({ example: '******************' }),
  address: z.string().openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().openapi({ example: '4161234567' })
})

const patchPartner = postPartner.partial()

const getPartnersSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations (Admin)'],
  description: 'Get all partners.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(z.object({ partners: z.array(PartnerZod) }))
}

const getPartnerSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  description: 'Get a specific partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const postPartnerSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations (Admin)'],
  description: 'Create a new partner.',
  request: {
    body: { content: { 'application/json': { schema: postPartner } } }
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const patchPartnerSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  description: 'Update a specific partner.',
  request: {
    params: partnerId,
    body: { content: { 'application/json': { schema: patchPartner } } }
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const deletePartnerSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  description: 'Delete a specific partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(z.object({ count: z.number().int().openapi({ example: 1 }) }))
}

export {
  postPartner,
  patchPartner,
  postPartnerSwagger,
  getPartnerSwagger,
  getPartnersSwagger,
  patchPartnerSwagger,
  deletePartnerSwagger
}
