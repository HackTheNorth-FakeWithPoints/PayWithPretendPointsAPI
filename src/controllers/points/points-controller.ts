import { Transaction as SequelizeTransaction } from 'sequelize'

import { verifyMemberState, verifyPartnerState } from '@/controllers/utils/index.ts'
import { runAsTransaction } from '@/utils/index.ts'

const getPointsController = (partnerId: number, memberId: number) => {
  return runAsTransaction<number>(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    return member.balance
  })
}

export { getPointsController }
