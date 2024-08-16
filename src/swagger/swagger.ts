import { OpenAPIRegistry, OpenApiGeneratorV3, RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

import { logger } from '@/logger/logger.ts'
import {
  createPartnerSwagger,
  createTxnForMemberSwagger,
  deletePartnerDetailsSwagger,
  getPartnerDetailsSwagger,
  getPointsSwagger,
  getTransactionHistoryByClientSwagger,
  getTransactionHistoryByPartnerSwagger,
  getTxnDetailForPartnerSwagger,
  getTxnDetailsForMemberSwagger,
  healthSwagger,
  putTxnDetailsForMemberSwagger,
  reverseTxnSwagger,
  updatePartnerDetailsSwagger
} from '@/routes/index.ts'

const generateSwaggerDocument = () => {
  extendZodWithOpenApi(z)

  const registryPaths: RouteConfig[] = [
    healthSwagger,
    getPointsSwagger,
    getTransactionHistoryByClientSwagger,
    createTxnForMemberSwagger,
    getTxnDetailsForMemberSwagger,
    reverseTxnSwagger,
    putTxnDetailsForMemberSwagger,
    createPartnerSwagger,
    getPartnerDetailsSwagger,
    updatePartnerDetailsSwagger,
    deletePartnerDetailsSwagger,
    getTransactionHistoryByPartnerSwagger,
    getTxnDetailForPartnerSwagger
  ]

  const registry = new OpenAPIRegistry()

  registryPaths.forEach((registryPath) => {
    registry.registerPath(registryPath)
  })

  const generator = new OpenApiGeneratorV3(registry.definitions)

  const swaggerDocument = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: process.env.npm_package_version as string,
      title: 'Pay With Pretend Points API',
      description: process.env.npm_package_description as string
    }
  })

  const fileContent = JSON.stringify(swaggerDocument)
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const swaggerFileName = `${__dirname}/oas.json`

  try {
    fs.writeFileSync(swaggerFileName, fileContent, {
      encoding: 'utf-8'
    })
  } catch {
    logger.error(`Failed to write to the file: ${swaggerFileName}!`)
  }
}

generateSwaggerDocument()
