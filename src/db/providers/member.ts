import { WhereOptions } from 'sequelize'

import { Member, MemberCreationAttributes } from '@/db/models/index.ts'

const countMembers = (where: WhereOptions<Member>) => {
  return Member.count({ where })
}

const findMembers = (where: WhereOptions<Member>, partnerId: number) => {
  return Member.findAll({ where: { ...where, partnerId }, raw: true })
}

const findMember = (where: WhereOptions<Member>, partnerId: number) => {
  return Member.findOne({ where: { ...where, partnerId }, raw: true })
}

const addMember = (member: MemberCreationAttributes) => {
  return Member.create(member, { raw: true }).then((member) => member.get({ plain: true }))
}

const modifyMember = (id: number, partnerId: number, member: Partial<Member>) => {
  return Member.update(member, { where: { id, partnerId }, returning: true }).then(([, members]) => {
    return members?.[0]?.get({ plain: true }) as Member
  })
}

const removeMember = (id: number, partnerId: number) => {
  return Member.destroy({ where: { id, partnerId } })
}

export { countMembers, findMembers, findMember, addMember, modifyMember, removeMember }
