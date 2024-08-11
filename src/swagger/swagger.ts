import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'yaml'
import { z } from 'zod'

import { routePrefix } from '@/constants/route-prefix.ts'

const generateSwaggerDocument = () => {
  extendZodWithOpenApi(z)

  const registry = new OpenAPIRegistry()
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

  const fileContent = yaml.stringify(swaggerDocument)
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  fs.writeFileSync(`${__dirname}/oas.yml`, fileContent, {
    encoding: 'utf-8'
  })
}

generateSwaggerDocument()
