import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@/constants/index.ts'
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
  status: keyof typeof TRANSACTION_STATUS
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
  declare status: keyof typeof TRANSACTION_STATUS
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
      primaryKey: true,
      validate: {
        isInt: true
      },
      field: 'id'
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[\w\s.()-]+$/gi,
        len: [2, 25]
      },
      field: 'reference'
    },
    partnerRefId: {
      type: DataTypes.STRING,
      validate: {
        is: /^[\w\s.()-]+$/gi,
        len: [2, 25]
      },
      field: 'partner_ref_id'
    },
    transactedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'transacted_at'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Partner,
        key: 'id'
      },
      onDelete: 'CASCADE',
      validate: {
        isInt: true
      },
      field: 'partner_id'
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Member,
        key: 'id'
      },
      onDelete: 'CASCADE',
      validate: {
        isInt: true
      },
      field: 'member_id'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_STATUS)),
      allowNull: false,
      defaultValue: TRANSACTION_STATUS.PENDING,
      values: Object.values(TRANSACTION_STATUS),
      validate: {
        is: /^[\w\s]+$/gi
      },
      field: 'status'
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_TYPE)),
      allowNull: false,
      defaultValue: TRANSACTION_TYPE.PAYMENT,
      values: Object.values(TRANSACTION_TYPE),
      validate: {
        is: /^[\w\s]+$/gi
      },
      field: 'type'
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'amount'
    },
    description: {
      type: DataTypes.JSONB,
      validate: {
        is: /^[\w\s.,!?'"()-]+$/gi,
        len: [2, 500]
      },
      field: 'description'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updated_at'
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
  partnerRefId: z.string().optional().openapi({ example: 'AAAA-0000-BBBB' }),
  transactedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  partnerId: z.number().openapi({ example: 1 }),
  memberId: z.number().openapi({ example: 1 }),
  status: z
    .enum([TRANSACTION_STATUS.PENDING, ...Object.values(TRANSACTION_STATUS).slice(1)])
    .openapi({ example: TRANSACTION_STATUS.PENDING }),
  type: z
    .enum([TRANSACTION_TYPE.PAYMENT, ...Object.values(TRANSACTION_TYPE).slice(1)])
    .openapi({ example: TRANSACTION_TYPE.PAYMENT }),
  amount: z.number().openapi({ example: 100 }),
  description: z.record(z.string().openapi({ example: 'Description' })).optional(),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Transaction, TransactionZod, type TransactionCreationAttributes }
