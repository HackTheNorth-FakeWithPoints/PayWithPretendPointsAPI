import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { TransactionZod } from '@/db/models/transaction.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const partnerId = z.object({
  partnerId: z.string()
})

const partnerIdTransactionId = z.object({
  partnerId: z.string(),
  transactionId: z.string()
})

const getPartnerTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions`,
  tags: ['Partner Transactions'],
  description: 'Get transactions for a partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(z.object({ transactions: z.array(TransactionZod) }))
}

const getPartnerTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions/{transactionId}`,
  tags: ['Partner Transactions'],
  description: 'Get a specific transaction for a partner.',
  request: {
    params: partnerIdTransactionId
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

export { getPartnerTransactionsSwagger, getPartnerTransactionSwagger }
