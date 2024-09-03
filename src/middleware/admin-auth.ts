import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError, handleError } from '@/utils/errors.ts'

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new ForbiddenError('Bearer token not found!')
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET as string) as jwt.JwtPayload

    if (!decodedToken?.id) {
      throw new ForbiddenError('Invalid token!')
    }

    req.adminId = decodedToken.id as string

    if (!req.adminId) {
      throw new ForbiddenError('Invalid admin!')
    }

    next()
  } catch (error) {
    handleError(error as Error, res)
  }
}

export { adminAuthMiddleware }
