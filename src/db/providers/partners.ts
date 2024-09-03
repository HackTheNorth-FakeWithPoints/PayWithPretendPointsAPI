import { WhereOptions } from 'sequelize'

import { Partner, PartnerCreationAttributes } from '@/db/models/index.ts'

const findPartners = (where: WhereOptions<Partner>) => {
  return Partner.findAll({ where, attributes: { exclude: ['password'] }, raw: true })
}

const findPartner = (where: WhereOptions<Partner>, excludePassword: boolean = true) => {
  return Partner.findOne({ where, attributes: { exclude: excludePassword ? ['password'] : [] }, raw: true })
}

const findPartnerById = (id: number) => {
  return Partner.findByPk(id, { attributes: { exclude: ['password'] }, raw: true })
}

const addPartner = (partner: PartnerCreationAttributes) => {
  return Partner.create(partner, { raw: true }).then((partner) => {
    return partner.get({ plain: true })
  })
}

const modifyPartner = (id: number, partner: Partial<Partner>) => {
  return Partner.update(partner, { where: { id }, returning: true }).then(([, partners]) => {
    return partners?.[0]?.get({ plain: true })
  })
}

const removePartner = (id: number) => {
  return Partner.destroy({ where: { id } })
}

export { findPartners, findPartner, findPartnerById, addPartner, modifyPartner, removePartner }
