export { authRouter } from '@/routes/auth.ts'
export { auth, authSwagger } from '@/routes/auth.schemas.ts'
export { adminAuthRouter } from '@/routes/admin-auth.ts'
export { adminAuth } from '@/routes/admin-auth.schemas.ts'
export { healthRouter } from '@/routes/health.ts'
export { healthSwagger } from '@/routes/health.schemas.ts'
export { loyaltyRouter } from '@/routes/loyalty.ts'
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
} from '@/routes/loyalty.schemas.ts'
