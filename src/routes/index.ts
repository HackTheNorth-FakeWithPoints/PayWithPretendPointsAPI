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
} from '@/routes/loyalty.schemas.ts'
