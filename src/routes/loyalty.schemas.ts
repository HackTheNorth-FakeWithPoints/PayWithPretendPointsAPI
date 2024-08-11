import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

/*****************************************************************
 * /loyalty/points/transfer
 */
const loyaltyPointsTransferRequestSchema = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const loyaltyPointsTransferResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const loyaltyPointsTransferPathOpenApiConfig: RouteConfig = {
  method: 'post',
  path: '/loyalty/points/transfer',
  description: 'Transfers points to another place.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: loyaltyPointsTransferRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: loyaltyPointsTransferResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

/*******************************************************************
 * /loyalty/points/payWithPoints
 */
const loyaltyPayWithPointsRequestSchema = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const loyaltyPayWithPointsResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const loyaltyPayWithPointsPathOpenApiConfig: RouteConfig = {
  method: 'post',
  path: '/loyalty/points/payWithPoints',
  description: 'Pay for something with points.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: loyaltyPayWithPointsRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: loyaltyPayWithPointsResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

/*******************************************************************
 * /loyalty/points/convert
 */
const loyaltyConvertPointsRequestSchema = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const loyaltyConvertPointsResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const loyaltyConvertPointsPathOpenApiConfig: RouteConfig = {
  method: 'post',
  path: '/loyalty/points/convert',
  description: 'Convert points to something else.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: loyaltyConvertPointsRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: loyaltyConvertPointsResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

/*******************************************************************
 * /loyalty/points/convert/calculatePoints
 */
const loyaltyConvertPointsCalculatePointsRequestSchema = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const loyaltyConvertPointsCalculatePointsResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const loyaltyConvertPointsCalculatePointsPathOpenApiConfig: RouteConfig = {
  method: 'post',
  path: '/loyalty/points/convert/calculatePoints',
  description: 'Calculate the points you have.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: loyaltyConvertPointsCalculatePointsRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: loyaltyConvertPointsCalculatePointsResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

/*******************************************************************
 * /rewards/client/accounts/:accountId/transactionHistory
 */
const rewardsClientsAccountsTransactionHistoryRequestSchema = z.object({
  accountId: z.string().openapi({ example: '1' })
})

const rewardsClientsAccountsTransactionHistoryResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const rewardsClientsAccountsTransactionHistoryPathOpenApiConfig: RouteConfig = {
  method: 'get',
  path: '/rewards/client/accounts/{accountId}/transactionHistory',
  description: 'Get the transaction history for an account.',
  request: {
    params: z.object({ accountId: z.string() })
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: rewardsClientsAccountsTransactionHistoryResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

/*******************************************************************
 * /rewards/client/accounts/:accountId/transactionDetail/:referenceId
 */
const rewardsClientsAccountsTransactionDetailRequestSchema = z.object({
  accountId: z.string().openapi({ example: '1' }),
  referenceId: z.string().openapi({ example: '1' })
})

const rewardsClientsAccountsTransactionDetailResponseSchema = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const rewardsClientsAccountsTransactionDetailPathOpenApiConfig: RouteConfig = {
  method: 'get',
  path: '/rewards/client/accounts/{accountId}/transactionDetail/{referenceId}',
  description: 'Get the transaction details for a given account id and reference id.',
  request: {
    params: z.object({ accountId: z.string(), referenceId: z.string() })
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: rewardsClientsAccountsTransactionHistoryResponseSchema
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    500: {
      description: 'Internal Server Error'
    }
  }
}

export {
  // /loyalty/points/transfer
  loyaltyPointsTransferRequestSchema,
  loyaltyPointsTransferResponseSchema,
  loyaltyPointsTransferPathOpenApiConfig,

  // /loyalty/points/payWithPoints
  loyaltyPayWithPointsRequestSchema,
  loyaltyPayWithPointsResponseSchema,
  loyaltyPayWithPointsPathOpenApiConfig,

  // /loyalty/points/convert
  loyaltyConvertPointsRequestSchema,
  loyaltyConvertPointsResponseSchema,
  loyaltyConvertPointsPathOpenApiConfig,

  // /loyalty/points/convert/calculatePoints
  loyaltyConvertPointsCalculatePointsRequestSchema,
  loyaltyConvertPointsCalculatePointsResponseSchema,
  loyaltyConvertPointsCalculatePointsPathOpenApiConfig,

  // /rewards/client/accounts/:accountId/transactionHistory
  rewardsClientsAccountsTransactionHistoryRequestSchema,
  rewardsClientsAccountsTransactionHistoryResponseSchema,
  rewardsClientsAccountsTransactionHistoryPathOpenApiConfig,

  // /rewards/client/accounts/:accountId/transactionDetail/:referenceId
  rewardsClientsAccountsTransactionDetailRequestSchema,
  rewardsClientsAccountsTransactionDetailResponseSchema,
  rewardsClientsAccountsTransactionDetailPathOpenApiConfig
}
