import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { PARTNER_PERMISSIONS } from '@/constants/partner-permissions.ts'
import { ROUTE_PREFIX } from '@/constants/route-prefix.ts'

extendZodWithOpenApi(z)

// Schemas
const createStatusSchema = (): z.ZodSchema =>
  z
    .object({
      code: z.string(),
      message: z.string(),
      nestedStatus: z.lazy(() => createStatusSchema()).optional()
    })
    .openapi({
      type: 'object',
      properties: { code: { type: 'string' }, message: { type: 'string' }, nestedStatus: { type: 'object' } }
    })

const Status = createStatusSchema()

const partnerId = z.object({
  partnerId: z.string().openapi({ example: '1' })
})

const partnerData = z.object({
  status: z.string().openapi({ example: 'ACTIVE' }),
  name: z.string().openapi({ example: 'Partner Name' }),
  description: z.string().openapi({ example: 'Partner Description' }),
  contactId: z.number().int().openapi({ example: 1 }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  email: z.string().openapi({ example: 'partner@example.com' }),
  password: z.string().openapi({ example: '******************' }),
  address: z.string().openapi({ example: '123 Main St, Anytown USA' }),
  phone: z.string().openapi({ example: '+1234567890' })
})

const optionalPartnerData = z.object({
  status: z.string().optional().openapi({ example: 'ACTIVE' }),
  name: z.string().optional().openapi({ example: 'Partner Name' }),
  description: z.string().optional().openapi({ example: 'Partner Description' }),
  contactId: z.number().int().optional().openapi({ example: 1 }),
  permission: z
    .enum([PARTNER_PERMISSIONS.READ, ...Object.values(PARTNER_PERMISSIONS)])
    .optional()
    .openapi({ example: PARTNER_PERMISSIONS.READ }),
  emailId: z.string().optional().openapi({ example: 'partner@example.com' }),
  password: z.string().optional().openapi({ example: '******************' })
})

const PartnerDetailsResponse = z.object({
  message: z.string().openapi({ type: 'string' }),
  partner: partnerData
})

const TxnDescription = z.object({
  refId: z.string(),
  timestamp: z.string().datetime(),
  partnerRefId: z.string().optional(),
  partnerId: z.string(),
  amount: z.number().int(),
  txnType: z.enum(['earn', 'burn']),
  txnDescription: z.array(z.string())
})

const TxnHistoryResponse = z.object({
  status: Status,
  transactions: z.array(TxnDescription)
})

const TxnResponse = z.object({
  status: Status,
  transaction: TxnDescription
})

const ErrorResponse = z.object({
  statusCode: z.number().int(),
  timestamp: z.number().int(),
  message: z.string()
})
/*****************************************************************
 * /loyalty/{memberId}/points
 */
const getPointsBalance = z.object({
  memberId: z.string(),
  partnerId: z.string()
})

const PointsBalanceResponse = z.object({
  status: Status,
  memberId: z.string(),
  partnerId: z.string().optional(),
  accountStatus: z.enum(['active', 'inactive', 'locked']).optional(),
  pointBalance: z.number().int()
})

// Route Configs
const getPointsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/points`,
  tags: ['Points Operations'],
  description: 'Gets total points from a single accounts of a member',
  request: {
    params: z.object({ memberId: z.string() }),
    headers: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: PointsBalanceResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/{memberId}/transactions
 */

const getTransactionHistoryByClient = z.object({
  memberId: z.string(),
  partnerId: z.string()
})

const getTransactionHistoryByClientSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Txn History'],
  description: 'gets transaction history from an account of a member',
  request: {
    params: z.object({ memberId: z.string() }),
    headers: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: TxnHistoryResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}
const CreateTxnRequest = z.object({
  txnDescription: TxnDescription
})

const createTxnForMember = z.object({
  memberId: z.string(),
  partnerId: z.string(),
  body: CreateTxnRequest
})

const CreateTxnResponse = z.object({
  status: Status,
  txnDescription: TxnDescription
})

const createTxnForMemberSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Txn History'],
  description: 'earn or burn points for a member for a partner',
  request: {
    params: z.object({ memberId: z.string() }),
    headers: z.object({ partnerId: z.string() }),
    body: { content: { 'application/json': { schema: CreateTxnRequest } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: CreateTxnResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/{memberId}/transactions/loyalty/{memberId}/transactions/{txnId}
 */

const getTxnDetailsForMember = z.object({
  memberId: z.string(),
  txnId: z.string(),
  partnerId: z.string()
})

const getTxnDetailsForMemberSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{txnId}`,
  tags: ['Txn History'],
  description: 'get the details of a single txn',
  request: {
    params: z.object({ memberId: z.string(), txnId: z.string() }),
    headers: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: TxnResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

const reverseTxn = z.object({
  memberId: z.string(),
  txnId: z.string(),
  partnerId: z.string()
})

const reverseTxnSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{txnId}`,
  tags: ['Txn History'],
  description: 'Reverses txn',
  request: {
    params: z.object({ memberId: z.string(), txnId: z.string() }),
    headers: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: TxnResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}
const ModifyTxnRequest = CreateTxnRequest

const putTxnDetailsForMember = z.object({
  memberId: z.string(),
  txnId: z.string(),
  partnerId: z.string(),
  body: ModifyTxnRequest
})

const putTxnDetailsForMemberSwagger: RouteConfig = {
  method: 'put',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{txnId}`,
  tags: ['Txn History'],
  description: 'update the details of a single txn',
  request: {
    params: z.object({ memberId: z.string(), txnId: z.string() }),
    headers: z.object({ partnerId: z.string() }),
    body: { content: { 'application/json': { schema: ModifyTxnRequest } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: TxnResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/partners
 */

const createPartnerSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations'],
  description: 'create partner record',
  request: {
    body: { content: { 'application/json': { schema: partnerData } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: PartnerDetailsResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/partners/{partnerId}
 */

const getPartnerDetailsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'gets details of a particular partner',
  request: {
    params: partnerId
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: PartnerDetailsResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

const updatePartnerDetailsSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'updates details of a particular partner',
  request: {
    params: partnerId,
    body: { content: { 'application/json': { schema: optionalPartnerData } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: PartnerDetailsResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

const deletePartnerDetailsSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'deletes details of a particular partner',
  request: {
    params: partnerId
  },
  responses: {
    200: {
      description: 'successful response',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ type: 'string' }),
            count: z.number().int().openapi({ example: 1 })
          })
        }
      }
    },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/partners/{partnerId}/transactions
 */

const getTransactionHistoryByPartner = z.object({
  partnerId: z.string()
})

const PartnerTxnHistoryResponse = TxnHistoryResponse

const getTransactionHistoryByPartnerSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions`,
  tags: ['Txn History By Partner'],
  description: 'gets txn history for a single partner',
  request: {
    params: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: PartnerTxnHistoryResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

/*****************************************************************
 * /loyalty/partners/{partnerId}/{txnId}
 */

const getTxnDetailForPartner = z.object({
  partnerId: z.string(),
  txnId: z.string()
})

const getTxnDetailForPartnerSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions/{txnId}`,
  tags: ['Txn History'],
  description: 'get the details of a single txn',
  request: {
    params: z.object({ partnerId: z.string(), txnId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: TxnResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

export {
  getPointsBalance,
  getPointsSwagger,
  getTransactionHistoryByClient,
  getTransactionHistoryByClientSwagger,
  createTxnForMember,
  createTxnForMemberSwagger,
  getTxnDetailsForMember,
  getTxnDetailsForMemberSwagger,
  reverseTxn,
  reverseTxnSwagger,
  putTxnDetailsForMember,
  putTxnDetailsForMemberSwagger,
  partnerId,
  partnerData,
  optionalPartnerData,
  createPartnerSwagger,
  getPartnerDetailsSwagger,
  updatePartnerDetailsSwagger,
  deletePartnerDetailsSwagger,
  getTransactionHistoryByPartner,
  getTransactionHistoryByPartnerSwagger,
  getTxnDetailForPartner,
  getTxnDetailForPartnerSwagger
}
