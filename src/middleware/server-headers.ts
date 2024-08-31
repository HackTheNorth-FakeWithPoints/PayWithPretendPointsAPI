import type { NextFunction, Request, Response } from 'express'

const serverHeaders = async (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN as string)
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,Origin,Accept,Allow')

  next()
}

export { serverHeaders }
