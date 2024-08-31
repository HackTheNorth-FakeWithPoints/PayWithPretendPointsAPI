import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { MemberZod } from '@/db/models/index.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const memberId = z.object({
  memberId: z.string().openapi({ example: '1' })
})

const postMember = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email().openapi({ example: 'member@example.com' }),
  balance: z.number().openapi({ example: 1000 }),
  status: z.string().openapi({ example: 'ACTIVE' })
})

const patchMember = postMember.partial()

const getMemberSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations (Admin)'],
  description: 'Get a specific member.',
  request: {
    params: memberId
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const postMemberSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/members`,
  tags: ['Member Operations (Admin)'],
  description: 'Create a new member.',
  request: {
    body: { content: { 'application/json': { schema: postMember } } }
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const patchMemberSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations (Admin)'],
  description: 'Update a specific member.',
  request: {
    params: memberId,
    body: { content: { 'application/json': { schema: patchMember } } }
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const deleteMemberSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations (Admin)'],
  description: 'Delete a specific member.',
  request: {
    params: memberId
  },
  responses: zodHTTPCodeResponses(z.object({ count: z.number().int().openapi({ example: 1 }) }))
}

export { postMember, patchMember, postMemberSwagger, getMemberSwagger, patchMemberSwagger, deleteMemberSwagger }
