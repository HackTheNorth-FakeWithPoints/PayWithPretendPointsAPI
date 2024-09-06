import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { partnerAuthHandler } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const partnerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    partnerAuthHandler(req, process.env.JWT_SECRET as jwt.Secret)

    next()
  } catch (error) {
    handleError(error as Error, res)
  }
}

export { partnerAuthMiddleware }
