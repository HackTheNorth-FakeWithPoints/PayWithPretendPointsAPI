import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError, handleError } from '@/utils/errors.ts'

const partnerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new ForbiddenError('Bearer token not found!')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload

    if (!decoded?.id) {
      throw new ForbiddenError('Invalid token!')
    }

    req.partnerId = decoded.id as number

    if (!req.partnerId) {
      throw new ForbiddenError('Invalid partner!')
    }

    next()
  } catch (error) {
    handleError(error as Error, res)
  }
}

export { partnerAuthMiddleware }
