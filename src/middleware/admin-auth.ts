import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { authHandler } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    authHandler(req, process.env.JWT_SECRET_ADMIN as jwt.Secret, true)

    next()
  } catch (error) {
    handleError(error as Error, res)
  }
}

export { adminAuthMiddleware }
