import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { TransactionZod } from '@/db/models/transaction.ts'
import { zodHTTPCodeResponses, zodIdSchema } from '@/utils/zod.ts'

extendZodWithOpenApi(z)

const partnerIdSchema = z.object({
  partnerId: zodIdSchema
})

const partnerIdTransactionIdSchema = z.object({
  partnerId: zodIdSchema,
  transactionId: zodIdSchema
})

const getPartnerTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions`,
  tags: ['Partner Transactions'],
  description: 'Get transactions for a partner.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transactions: z.array(TransactionZod) }))
}

const getPartnerTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions/{transactionId}`,
  tags: ['Partner Transactions'],
  description: 'Get a specific transaction for a partner.',
  request: {
    params: partnerIdTransactionIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

export { partnerIdSchema, partnerIdTransactionIdSchema, getPartnerTransactionsSwagger, getPartnerTransactionSwagger }
