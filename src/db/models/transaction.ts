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
  partnerId: number
  memberId: number
  partnerRefId?: string
  status: keyof typeof TRANSACTION_STATUS
  type: string
  amount: number
  note?: string
  transactedAt: Date
  createdAt: Date
  updatedAt: Date
}

type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'transactedAt' | 'status' | 'reference'
>

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: number
  declare reference: string
  declare partnerId: number
  declare memberId: number
  declare partnerRefId?: string
  declare status: keyof typeof TRANSACTION_STATUS
  declare type: string
  declare amount: number
  declare note?: string
  declare transactedAt: Date
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
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      },
      field: 'reference'
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
    partnerRefId: {
      type: DataTypes.TEXT,
      validate: {
        is: /^[\w\s.,!?'"()-]+$/gi,
        len: [2, 500]
      },
      field: 'partner_ref_id'
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
    note: {
      type: DataTypes.TEXT,
      validate: {
        is: /^[\w\s.,!?'"()-]+$/gi,
        len: [2, 500]
      },
      field: 'note'
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
  reference: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174001' }),
  partnerId: z.number().openapi({ example: 1 }),
  memberId: z.number().openapi({ example: 1 }),
  partnerRefId: z.string().optional().openapi({ example: 'INV-20234' }),
  status: z
    .enum([TRANSACTION_STATUS.PENDING, ...Object.values(TRANSACTION_STATUS).slice(1)])
    .default(TRANSACTION_STATUS.PENDING)
    .openapi({ example: TRANSACTION_STATUS.PENDING }),
  type: z
    .enum([TRANSACTION_TYPE.PAYMENT, ...Object.values(TRANSACTION_TYPE).slice(1)])
    .default(TRANSACTION_TYPE.PAYMENT)
    .openapi({ example: TRANSACTION_TYPE.PAYMENT }),
  amount: z.number().openapi({ example: 100 }),
  note: z.string().optional().openapi({ example: 'This is a note about the transaction.' }),
  transactedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  createdAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' }),
  updatedAt: z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })
})

export { Transaction, TransactionZod, type TransactionCreationAttributes }
