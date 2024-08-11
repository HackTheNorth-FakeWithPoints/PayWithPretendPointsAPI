import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { routePrefix } from '@/constants/index.ts'

extendZodWithOpenApi(z)

/*****************************************************************
 * /loyalty/points/transfer
 */
const pointsTransfer = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const pointsTransferResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const pointsTransferSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/loyalty/points/transfer`,
  tags: ['Points'],
  description: 'Transfers points to another place.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: pointsTransfer
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: pointsTransferResponse
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
const payWithPoints = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const payWithPointsResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const payWithPointsSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/loyalty/points/payWithPoints`,
  description: 'Pay for something with points.',
  tags: ['Points'],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: payWithPoints
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: payWithPointsResponse
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
const convertPoints = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const convertPointsResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const convertPointsSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/loyalty/points/convert`,
  description: 'Convert points to something else.',
  tags: ['Points'],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: convertPoints
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: convertPointsResponse
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
const calculatePoints = z.object({
  points: z.number().int().openapi({ example: 100 })
})

const calculatePointsResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const calculatePointsSwagger: RouteConfig = {
  method: 'post',
  path: `${routePrefix}/loyalty/points/convert/calculatePoints`,
  description: 'Calculate the points you have.',
  tags: ['Points'],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: calculatePoints
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: calculatePointsResponse
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
const transactionHistory = z.object({
  accountId: z.string().openapi({ example: '1' })
})

const transactionHistoryResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const transactionHistorySwagger: RouteConfig = {
  method: 'get',
  path: `${routePrefix}/rewards/client/accounts/{accountId}/transactionHistory`,
  description: 'Get the transaction history for an account.',
  tags: ['Transactions'],
  request: {
    params: z.object({ accountId: z.string() })
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: transactionHistoryResponse
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
const transactionDetail = z.object({
  accountId: z.string().openapi({ example: '1' }),
  referenceId: z.string().openapi({ example: '1' })
})

const transactionDetailResponse = z.object({
  message: z.string().openapi({ example: '100 points transferred!' })
})

const transactionDetailSwagger: RouteConfig = {
  method: 'get',
  path: `${routePrefix}/rewards/client/accounts/{accountId}/transactionDetail/{referenceId}`,
  description: 'Get the transaction details for a given account id and reference id.',
  tags: ['Transactions'],
  request: {
    params: z.object({ accountId: z.string(), referenceId: z.string() })
  },
  responses: {
    200: {
      description: 'Object with message data.',
      content: {
        'application/json': {
          schema: transactionDetailResponse
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
  pointsTransfer,
  pointsTransferSwagger,
  payWithPoints,
  payWithPointsSwagger,
  convertPoints,
  convertPointsSwagger,
  calculatePoints,
  calculatePointsSwagger,
  transactionHistory,
  transactionHistorySwagger,
  transactionDetail,
  transactionDetailSwagger
}
