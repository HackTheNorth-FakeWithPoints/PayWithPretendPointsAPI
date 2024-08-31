import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodHTTPCodeResponses } from '@/utils/zod-common.ts'

extendZodWithOpenApi(z)

const partnerId = z.object({
  partnerId: z.string()
})

const partnerIdTransactionId = z.object({
  partnerId: z.string(),
  transactionId: z.string()
})

const getTransaction = z.object({
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

const getPartnerTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions`,
  tags: ['Partner Transactions'],
  description: 'Get transactions for a partner.',
  request: {
    params: partnerId
  },
  responses: zodHTTPCodeResponses(z.array(getTransaction))
}

const getPartnerTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions/{transactionId}`,
  tags: ['Partner Transactions'],
  description: 'Get a specific transaction for a partner.',
  request: {
    params: partnerIdTransactionId
  },
  responses: zodHTTPCodeResponses(getTransaction)
}

export { getPartnerTransactionsSwagger, getPartnerTransactionSwagger }
