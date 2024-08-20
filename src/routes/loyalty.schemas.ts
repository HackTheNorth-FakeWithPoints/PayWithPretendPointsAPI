import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

const routePrefix = '/api/v1'

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

const PartnerDescription = z.object({
  partnerId: z.string(),
  name: z.string(),
  description: z.string(),
  contacts: z.array(
    z.object({
      name: z.string(),
      type: z.enum(['partner', 'member']),
      primaryAddress: z.object({
        street: z.array(z.string())
      }),
      secondardyAddress: z
        .object({
          street: z.array(z.string())
        })
        .optional(),
      phone: z.array(
        z.object({
          number: z.string(),
          type: z.enum(['home', 'work', 'cell', 'other'])
        })
      ),
      email: z.array(
        z.object({
          email: z.string(),
          type: z.enum(['home', 'work', 'other'])
        })
      )
    })
  )
})

const PartnerDetailsResponse = z.object({
  status: Status,
  placeHolder: z.string().optional(),
  PartnerDescription: PartnerDescription
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
  path: `${routePrefix}/loyalty/{memberId}/points`,
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
  path: `${routePrefix}/loyalty/{memberId}/transactions`,
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
  path: `${routePrefix}/loyalty/{memberId}/transactions`,
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
  path: `${routePrefix}/loyalty/{memberId}/transactions/{txnId}`,
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
  path: `${routePrefix}/loyalty/{memberId}/transactions/{txnId}`,
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
  path: `${routePrefix}/loyalty/{memberId}/transactions/{txnId}`,
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

const createPartner = z.object({
  status: Status,
  partnerId: z.string(),
  partnerDescription: PartnerDescription
})

const CreatePartnerResponse = PartnerDetailsResponse

const createPartnerSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/loyalty/partners`,
  tags: ['Partner Operations'],
  description: 'create partner record',
  request: {
    body: { content: { 'application/json': { schema: createPartner } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: CreatePartnerResponse } } },
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

const getPartnerDetails = z.object({
  partnerId: z.string()
})

const GetPartnerDetailsResponse = PartnerDetailsResponse

const getPartnerDetailsSwagger: RouteConfig = {
  method: 'get',
  path: `${routePrefix}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'gets details of a particular partner',
  request: {
    params: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: GetPartnerDetailsResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

const UpdatePartnerResponse = PartnerDetailsResponse

const updatePartnerDetails = z.object({
  status: Status,
  partnerId: z.string(),
  partnerDescription: PartnerDescription
})

const UpdatePartnerRequestBody = z.object({
  status: Status,
  partnerDescription: PartnerDescription
})

const updatePartnerDetailsSwagger: RouteConfig = {
  method: 'put',
  path: `${routePrefix}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'updates details of a particular partner',
  request: {
    params: z.object({ partnerId: z.string() }),
    body: { content: { 'application/json': { schema: UpdatePartnerRequestBody } } }
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: UpdatePartnerResponse } } },
    204: { description: 'No Content', content: { 'application/json': { schema: ErrorResponse } } },
    400: { description: 'Bad Request / validation error in given data' },
    401: { description: 'Not authenticated' },
    403: { description: 'Not authorized to view this resource' },
    404: { description: 'resource not found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable', content: { '*/*': { schema: ErrorResponse } } }
  }
}

const deletePartnerDetails = z.object({
  partnerId: z.string()
})

const DeletePartnerResponse = PartnerDetailsResponse

const deletePartnerDetailsSwagger: RouteConfig = {
  method: 'delete',
  path: `${routePrefix}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations'],
  description: 'deletes details of a particular partner',
  request: {
    params: z.object({ partnerId: z.string() })
  },
  responses: {
    200: { description: 'successful response', content: { 'application/json': { schema: DeletePartnerResponse } } },
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
  path: `${routePrefix}/loyalty/partners/{partnerId}/transactions`,
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
  path: `${routePrefix}/loyalty/partners/{partnerId}/transactions/{txnId}`,
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
  createPartner,
  createPartnerSwagger,
  getPartnerDetails,
  getPartnerDetailsSwagger,
  updatePartnerDetails,
  updatePartnerDetailsSwagger,
  deletePartnerDetails,
  deletePartnerDetailsSwagger,
  getTransactionHistoryByPartner,
  getTransactionHistoryByPartnerSwagger,
  getTxnDetailForPartner,
  getTxnDetailForPartnerSwagger
}
