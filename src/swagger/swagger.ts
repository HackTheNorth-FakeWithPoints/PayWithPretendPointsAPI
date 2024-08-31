import { OpenAPIRegistry, OpenApiGeneratorV3, RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

import { logger } from '@/logger/logger.ts'
import { postAdminAuthSwagger, postPartnerAuthSwagger } from '@/routes/auth/index.ts'
import { getHealthSwagger } from '@/routes/health/index.ts'
import {
  deleteMemberTransactionSwagger,
  getMemberTransactionSwagger,
  getMemberTransactionsSwagger,
  patchMemberTransactionSwagger,
  postMemberTransactionSwagger
} from '@/routes/member-transactions/index.ts'
import { deleteMemberSwagger, getMemberSwagger, patchMemberSwagger, postMemberSwagger } from '@/routes/members/index.ts'
import { getPartnerTransactionSwagger, getPartnerTransactionsSwagger } from '@/routes/partner-transactions/index.ts'
import {
  deletePartnerSwagger,
  getPartnerSwagger,
  patchPartnerSwagger,
  postPartnerSwagger
} from '@/routes/partners/index.ts'
import { getPointsSwagger } from '@/routes/points/index.ts'

const generateSwaggerDocument = () => {
  extendZodWithOpenApi(z)

  const registryPaths: RouteConfig[] = [
    getHealthSwagger,
    postPartnerAuthSwagger,
    postAdminAuthSwagger,
    getPointsSwagger,
    getPartnerTransactionSwagger,
    getPartnerTransactionsSwagger,
    getMemberTransactionSwagger,
    getMemberTransactionsSwagger,
    postMemberTransactionSwagger,
    patchMemberTransactionSwagger,
    deleteMemberTransactionSwagger,
    getPartnerSwagger,
    postPartnerSwagger,
    patchPartnerSwagger,
    deletePartnerSwagger,
    getMemberSwagger,
    postMemberSwagger,
    patchMemberSwagger,
    deleteMemberSwagger
  ]

  const registry = new OpenAPIRegistry()

  const securityScheme = registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  })

  registryPaths.forEach((registryPath) => {
    registry.registerPath({
      ...registryPath,
      ...(!registryPath?.tags?.[0].match(/Status|Authentication/gi) && { security: [{ [securityScheme.name]: [] }] })
    })
  })

  const generator = new OpenApiGeneratorV3(registry.definitions)

  const swaggerDocument = generator.generateDocument({
    openapi: '3.0.0',
    servers: [
      { url: 'paywithpretendpointsapi.onrender.com/', description: 'Production' },
      { url: 'localhost:3000/', description: 'Development' }
    ],
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
