import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/routes.ts'
import { MemberZod } from '@/db/models/index.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'
import { zodDeletedCountResponse, zodIdSchema } from '@/utils/zod.ts'

extendZodWithOpenApi(z)

const memberIdSchema = z.object({
  memberId: zodIdSchema
})

const postMember = MemberZod.omit({ id: true, createdAt: true, updatedAt: true, status: true, partnerId: true })

const patchMember = postMember.partial()

const getMembersSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/members`,
  tags: ['Member Operations'],
  summary: 'Get all members.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ members: z.array(MemberZod) }))
}

const getMemberSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations'],
  summary: 'Get a specific member.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const postMemberSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/members`,
  tags: ['Member Operations'],
  summary: 'Create a new member.',
  request: {
    body: { content: { 'application/json': { schema: postMember } } }
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const patchMemberSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations'],
  summary: 'Update a specific member.',
  request: {
    params: memberIdSchema,
    body: { content: { 'application/json': { schema: patchMember } } }
  },
  responses: zodHTTPCodeResponses(z.object({ member: MemberZod }))
}

const deleteMemberSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/members/{memberId}`,
  tags: ['Member Operations'],
  summary: 'Delete a specific member.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(zodDeletedCountResponse)
}

export {
  memberIdSchema,
  postMember,
  patchMember,
  postMemberSwagger,
  getMemberSwagger,
  getMembersSwagger,
  patchMemberSwagger,
  deleteMemberSwagger
}
