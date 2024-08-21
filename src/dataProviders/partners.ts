import { WhereOptions } from 'sequelize'

import { Partner } from '@/db/models/index.ts'

export async function findPartners(where: WhereOptions<any>): Promise<Partner[]> {
  return Partner.findAll({ where: where })
}

export async function findPartnerById(id: number): Promise<Partner | null> {
  return Partner.findByPk(id)
}
