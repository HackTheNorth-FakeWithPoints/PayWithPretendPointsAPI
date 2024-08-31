import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const memberId = z.object({
  memberId: z.string().openapi({ example: '1' })
})

const memberIdTransactionId = z.object({
  memberId: z.string().openapi({ example: '1' }),
  transactionId: z.string().openapi({ example: '1' })
})

const postTransaction = z.object({
  status: z.enum(['reverse', 'delete']).openapi({ example: 'reverse' }),
  partnerRefId: z.string().optional().openapi({ example: '0000-AAAA-BBBB' }),
  reference: z.string().openapi({ example: '0000-AAAA-BBBB' }),
  type: z.string().openapi({ example: 'Type' }),
  amount: z.number().openapi({ example: 100 }),
  description: z
    .object({
      description1: z.string().optional().openapi({ example: 'Description' }),
      description2: z.string().optional().openapi({ example: 'Description' }),
      description3: z.string().optional().openapi({ example: 'Description' })
    })
    .optional()
})

const patchTransaction = z.object({
  status: z.enum(['reverse', 'delete']).optional().openapi({ example: 'reverse' }),
  partnerRefId: z.string().optional().openapi({ example: '0000-AAAA-BBBB' }),
  reference: z.string().optional().openapi({ example: '0000-AAAA-BBBB' }),
  type: z.string().optional().openapi({ example: 'Type' }),
  amount: z.number().optional().openapi({ example: 100 }),
  description: z
    .object({
      description1: z.string().optional().openapi({ example: 'Description' }),
      description2: z.string().optional().openapi({ example: 'Description' }),
      description3: z.string().optional().openapi({ example: 'Description' })
    })
    .optional()
})

const getMemberTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  description: 'gets transaction history from an account of a member',
  request: {
    params: memberId
  },
  responses: zodHTTPCodeResponses(z.array(postTransaction))
}

const getMemberTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'get the details of a single txn',
  request: {
    params: memberIdTransactionId
  },
  responses: zodHTTPCodeResponses(postTransaction)
}

const postMemberTransactionSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  description: 'earn or burn points for a member for a partner',
  request: {
    params: memberId,
    body: { content: { 'application/json': { schema: postTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({}))
}

const patchMemberTransactionSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'update the details of a single txn',
  request: {
    params: memberIdTransactionId,
    body: { content: { 'application/json': { schema: patchTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({}))
}

const deleteMemberTransactionSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'Reverses txn',
  request: {
    params: memberIdTransactionId
  },
  responses: zodHTTPCodeResponses(z.object({}))
}

export {
  postTransaction,
  patchTransaction,
  getMemberTransactionsSwagger,
  getMemberTransactionSwagger,
  postMemberTransactionSwagger,
  patchMemberTransactionSwagger,
  deleteMemberTransactionSwagger
}
