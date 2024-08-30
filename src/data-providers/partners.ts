import { WhereOptions } from 'sequelize'

import { Partner } from '@/db/models/index.ts'

const findPartners = (where: WhereOptions<Partner>) => {
  return Partner.findAll({ where })
}

const findPartnerById = (id: number) => {
  return Partner.findByPk(id)
}

const addPartner = (partner: Partial<Partner>) => {
  return Partner.create(partner)
}

const modifyPartner = (partnerId: number, partner: Partial<Partner>) => {
  return Partner.update(partner, { where: { partnerId }, returning: true })
}

const removePartner = (partnerId: number) => {
  return Partner.destroy({ where: { partnerId } })
}

export { findPartners, findPartnerById, addPartner, modifyPartner, removePartner }
