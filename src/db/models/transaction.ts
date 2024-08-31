import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '@/db/index.ts'
import { Member, Partner } from '@/db/models/index.ts'

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
  description?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>

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
  declare description?: Record<string, any>
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
      type: DataTypes.DECIMAL(10, 2),
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
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    sequelize
  }
)

export { Transaction }
