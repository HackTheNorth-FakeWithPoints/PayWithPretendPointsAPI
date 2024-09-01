import { OpenAPIRegistry, OpenApiGeneratorV3, RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'yaml'
import { z } from 'zod'

import { MemberZod, PartnerZod, TransactionZod } from '@/db/models/index.ts'
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
import {
  deleteMemberSwagger,
  getMemberSwagger,
  getMembersSwagger,
  patchMemberSwagger,
  postMemberSwagger
} from '@/routes/members/index.ts'
import { getPartnerTransactionSwagger, getPartnerTransactionsSwagger } from '@/routes/partner-transactions/index.ts'
import {
  deletePartnerSwagger,
  getPartnerSwagger,
  getPartnersSwagger,
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
    getPartnersSwagger,
    postPartnerSwagger,
    patchPartnerSwagger,
    deletePartnerSwagger,
    getMemberSwagger,
    getMembersSwagger,
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

  registry.register('Partner', PartnerZod)
  registry.register('Member', MemberZod)
  registry.register('Transaction', TransactionZod)

  registryPaths.forEach((registryPath) => {
    registry.registerPath({
      ...registryPath,
      ...(!registryPath?.tags?.[0].match(/Status|Authentication/gi) && { security: [{ [securityScheme.name]: [] }] })
    })
  })

  const generator = new OpenApiGeneratorV3(registry.definitions)

  const swaggerDocument = generator.generateDocument({
    openapi: '3.0.0',
    servers: [{ url: '', description: 'Production' }],
    info: {
      version: process.env.npm_package_version as string,
      title: 'Pay With Pretend Points API',
      description: process.env.npm_package_description as string
    }
  })

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const jsonFileContent = JSON.stringify(swaggerDocument)
  const yamlFileContent = yaml.stringify(swaggerDocument)

  const jsonSwaggerFileName = `${__dirname}/oas.json`
  const yamlSwaggerFileName = `${__dirname}/oas.yml`

  try {
    fs.writeFileSync(jsonSwaggerFileName, jsonFileContent, {
      encoding: 'utf-8'
    })

    fs.writeFileSync(yamlSwaggerFileName, yamlFileContent, {
      encoding: 'utf-8'
    })
  } catch {
    logger.error(`Failed to write to the files: ${jsonSwaggerFileName} and ${yamlSwaggerFileName}!`)
    process.exit(process.exitCode ?? 1)
  }
}

generateSwaggerDocument()
