import { ResponseConfig } from '@asteasolutions/zod-to-openapi'
import { ZodType, ZodTypeDef } from 'zod'

const zodHTTPCodeResponses = (schema: ZodType<unknown, ZodTypeDef, unknown>) => {
  return {
    200: { description: 'OK', content: { 'application/json': { schema } } },
    204: { description: 'No Content' },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
    404: { description: 'Not Found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable' }
  } satisfies { [statusCode: string]: ResponseConfig }
}

export { zodHTTPCodeResponses }
