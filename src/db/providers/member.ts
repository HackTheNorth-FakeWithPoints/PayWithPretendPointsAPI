import { WhereOptions } from 'sequelize'

import { Member, MemberCreationAttributes } from '@/db/models/index.ts'

const findMembers = (where: WhereOptions<Member>) => {
  return Member.findAll({ where, raw: true })
}

const findMember = (where: WhereOptions<Member>) => {
  return Member.findOne({ where, raw: true })
}

const findMemberById = (id: number) => {
  return Member.findByPk(id, { raw: true })
}

const addMember = (member: MemberCreationAttributes) => {
  return Member.create(member, { raw: true }).then((member) => member.get({ plain: true }))
}

const modifyMember = (id: number, member: Partial<Member>) => {
  return Member.update(member, { where: { id }, returning: true }).then(([, members]) => {
    return members?.[0]?.get({ plain: true }) as Member
  })
}

const removeMember = (id: number) => {
  return Member.destroy({ where: { id } })
}

export { findMembers, findMember, findMemberById, addMember, modifyMember, removeMember }
