import { WhereOptions } from 'sequelize'

import { Member, MemberCreationAttributes } from '@/db/models/index.ts'

const findMembers = (where: WhereOptions<Member>) => {
  return Member.findAll({ where })
}

const findMember = (where: WhereOptions<Member>) => {
  return Member.findOne({ where })
}

const findMemberById = (id: number) => {
  return Member.findByPk(id)
}

const addMember = (member: MemberCreationAttributes) => {
  return Member.create(member)
}

const modifyMember = (id: number, member: Partial<Member>) => {
  return Member.update(member, { where: { id }, returning: true })
}

const removeMember = (id: number) => {
  return Member.destroy({ where: { id } })
}

export { findMembers, findMember, findMemberById, addMember, modifyMember, removeMember }
