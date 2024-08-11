export { homeRouter } from '@/routes/home.ts'
export { homeResponseSchema, homePathOpenApiConfig } from '@/routes/home.schemas.ts'
export { healthRouter } from '@/routes/health.ts'
export { healthResponseSchema, healthPathOpenApiConfig } from '@/routes/health.schemas.ts'
export { loyaltyRouter } from '@/routes/loyalty.ts'
export {
  loyaltyPointsTransferRequestSchema,
  loyaltyPointsTransferResponseSchema,
  loyaltyPointsTransferPathOpenApiConfig,
  loyaltyPayWithPointsRequestSchema,
  loyaltyPayWithPointsResponseSchema,
  loyaltyPayWithPointsPathOpenApiConfig,
  loyaltyConvertPointsRequestSchema,
  loyaltyConvertPointsResponseSchema,
  loyaltyConvertPointsPathOpenApiConfig,
  loyaltyConvertPointsCalculatePointsRequestSchema,
  loyaltyConvertPointsCalculatePointsResponseSchema,
  loyaltyConvertPointsCalculatePointsPathOpenApiConfig,
  rewardsClientsAccountsTransactionHistoryRequestSchema,
  rewardsClientsAccountsTransactionHistoryResponseSchema,
  rewardsClientsAccountsTransactionHistoryPathOpenApiConfig,
  rewardsClientsAccountsTransactionDetailRequestSchema,
  rewardsClientsAccountsTransactionDetailResponseSchema,
  rewardsClientsAccountsTransactionDetailPathOpenApiConfig
} from '@/routes/loyalty.schemas.ts'
