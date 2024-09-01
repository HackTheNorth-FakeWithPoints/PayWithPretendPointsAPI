import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'
import { TransactionZod } from '@/db/models/transaction.ts'
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

const patchTransaction = postTransaction.partial()

const getMemberTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  description: 'Get all transactions of a member.',
  request: {
    params: memberId
  },
  responses: zodHTTPCodeResponses(z.object({ transactions: z.array(TransactionZod) }))
}

const getMemberTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'Get a specific transaction for a member.',
  request: {
    params: memberIdTransactionId
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const postMemberTransactionSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  description: 'Create a new transaction for a member.',
  request: {
    params: memberId,
    body: { content: { 'application/json': { schema: postTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const patchMemberTransactionSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'Update a specific transaction for a member.',
  request: {
    params: memberIdTransactionId,
    body: { content: { 'application/json': { schema: patchTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const deleteMemberTransactionSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  description: 'Reverses a transaction for a member.',
  request: {
    params: memberIdTransactionId
  },
  responses: zodHTTPCodeResponses(z.object({ count: z.number().int().openapi({ example: 1 }) }))
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
