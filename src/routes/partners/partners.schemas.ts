import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/routes.ts'
import { PartnerZod } from '@/db/models/partner.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'
import { zodDeletedCountResponse, zodIdSchema } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const partnerIdSchema = z.object({
  partnerId: zodIdSchema
})

const postPartner = PartnerZod.omit({ id: true, createdAt: true, updatedAt: true })

const patchPartner = postPartner.partial()

const getPartnersSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations (Admin)'],
  description: 'Get all partners.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ partners: z.array(PartnerZod) }))
}

const getPartnerSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  description: 'Get a specific partner.',
  request: {
    params: partnerIdSchema
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
    params: partnerIdSchema,
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
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(zodDeletedCountResponse)
}

export {
  partnerIdSchema,
  postPartner,
  patchPartner,
  postPartnerSwagger,
  getPartnerSwagger,
  getPartnersSwagger,
  patchPartnerSwagger,
  deletePartnerSwagger
}
