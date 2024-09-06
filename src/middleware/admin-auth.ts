import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { adminAuthHandler } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    adminAuthHandler(req, process.env.JWT_ADMIN_SECRET as jwt.Secret)

    next()
  } catch (error) {
    handleError(error as Error, res)
  }
}

export { adminAuthMiddleware }
