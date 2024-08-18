export { authRouter } from '@/routes/auth.ts'
export { auth, authSwagger } from '@/routes/auth.schemas.ts'
export { healthRouter } from '@/routes/health.ts'
export { healthSwagger } from '@/routes/health.schemas.ts'
export { loyaltyRouter } from '@/routes/loyalty.ts'
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
} from '@/routes/loyalty.schemas.ts'
