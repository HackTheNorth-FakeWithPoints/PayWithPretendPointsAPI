import { DataTypes, Model, Optional } from 'sequelize'

import { sequelize } from '@/db/index.ts'
import { Member, Partner } from '@/db/models/index.ts'

interface TransactionAttributes {
  txnId: number
  refId: string
  partnerRefId?: string
  timestamp: Date
  partnerId: number
  memberId: number
  status: 'delete' | 'reverse'
  txnType: string
  amount: number
  description1?: string
  description2?: string
  description3?: string
  createdAt: Date
  updatedAt: Date
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'txnId'>

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare txnId: number
  declare refId: string
  declare partnerRefId?: string
  declare timestamp: Date
  declare partnerId: number
  declare memberId: number
  declare status: 'delete' | 'reverse'
  declare txnType: string
  declare amount: number
  declare description1?: string
  declare description2?: string
  declare description3?: string
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
    txnId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    refId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    partnerRefId: {
      type: DataTypes.STRING
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    partnerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Partner,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: Member,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.ENUM('delete', 'reverse'),
      allowNull: false
    },
    txnType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description1: {
      type: DataTypes.STRING
    },
    description2: {
      type: DataTypes.STRING
    },
    description3: {
      type: DataTypes.STRING
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
