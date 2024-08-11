import { OpenAPIRegistry, OpenApiGeneratorV3, RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

import { routePrefix } from '@/constants/route-prefix.ts'
import {
  healthPathOpenApiConfig,
  homePathOpenApiConfig,
  loyaltyConvertPointsCalculatePointsPathOpenApiConfig,
  loyaltyConvertPointsPathOpenApiConfig,
  loyaltyPayWithPointsPathOpenApiConfig,
  loyaltyPointsTransferPathOpenApiConfig,
  rewardsClientsAccountsTransactionDetailPathOpenApiConfig,
  rewardsClientsAccountsTransactionHistoryPathOpenApiConfig
} from '@/routes/index.ts'

const generateSwaggerDocument = () => {
  extendZodWithOpenApi(z)

  const registryPaths: RouteConfig[] = [
    homePathOpenApiConfig,
    healthPathOpenApiConfig,
    loyaltyConvertPointsCalculatePointsPathOpenApiConfig,
    loyaltyConvertPointsPathOpenApiConfig,
    loyaltyPayWithPointsPathOpenApiConfig,
    loyaltyPointsTransferPathOpenApiConfig,
    rewardsClientsAccountsTransactionDetailPathOpenApiConfig,
    rewardsClientsAccountsTransactionHistoryPathOpenApiConfig
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
      title: process.env.npm_package_name as string,
      description: process.env.npm_package_description as string
    },
    servers: [{ url: routePrefix }]
  })

  const fileContent = JSON.stringify(swaggerDocument)
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  fs.writeFileSync(`${__dirname}/oas.json`, fileContent, {
    encoding: 'utf-8'
  })
}

generateSwaggerDocument()
