import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { sequelize } from '@/db/index.ts'
import { Member, Partner } from '@/db/models/index.ts'

extendZodWithOpenApi(z)

interface TransactionAttributes {
  id: number
  reference: string
  partnerRefId?: string
  transactedAt: Date
  partnerId: number
  memberId: number
  status: 'delete' | 'reverse'
  type: string
  amount: number
  description?: { [key: string]: string }
  createdAt: Date
  updatedAt: Date
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt' | 'transactedAt'>

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: number
  declare reference: string
  declare partnerRefId?: string
  declare transactedAt: Date
  declare partnerId: number
  declare memberId: number
  declare status: 'delete' | 'reverse'
  declare type: string
  declare amount: number
  declare description?: { [key: string]: string }
  declare createdAt: Date
  declare updatedAt: Date

  static associate(models: { Partner: typeof Partner; Member: typeof Member }) {
    Transaction.belongsTo(models.Partner, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })

    Transaction.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE'
    })
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partnerRefId: {
      type: DataTypes.STRING
    },
    transactedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('delete', 'reverse'),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.JSONB
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    modelName: 'transaction',
    tableName: 'transactions',
    timestamps: true,
    sequelize
  }
)

const TransactionZod = z.object({
  id: z.number().openapi({ example: 1 }),
  reference: z.string().openapi({ example: 'AAAA-0000-BBBB' }),
  partnerRefId: z.number().optional().openapi({ example: 1 }),
  transactedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  partnerId: z.number().openapi({ example: 1 }),
  memberId: z.number().openapi({ example: 1 }),
  status: z.enum(['delete', 'reverse']).openapi({ example: 'reverse' }),
  type: z.string().openapi({ example: 'Purchase' }),
  amount: z.number().openapi({ example: 100 }),
  description: z.record(z.string().openapi({ example: 'Description' })).optional(),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Transaction, TransactionZod, type TransactionCreationAttributes }
