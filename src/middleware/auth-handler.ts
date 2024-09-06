import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '@/utils/index.ts'

const authHandler = (req: Request, jwtSecret: jwt.Secret, isAdmin: boolean) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new ForbiddenError('Bearer token not found!')
  }

  const decodedToken = jwt.verify(token, jwtSecret) as jwt.JwtPayload

  if (!decodedToken?.id) {
    throw new ForbiddenError('Invalid token!')
  }

  if (isAdmin) {
    req.adminId = decodedToken.id as string
  } else {
    req.partnerId = decodedToken.id as number
  }

  if (isAdmin && !req.adminId) {
    throw new ForbiddenError('Invalid admin id provided in the payload!')
  }

  if (!isAdmin && !req.partnerId) {
    throw new ForbiddenError('Invalid partner id provided in the payload!')
  }

  return req
}

export { authHandler }
