import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(403).json({ message: 'Authorization header not found!' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload

    if (!decoded || !decoded.partnerId) {
      return res.status(403).json({ message: 'Invalid token!' })
    }

    req.partnerId = decoded.partnerId.toString()

    next()
  } catch {
    return res.status(403).json({ message: 'Not authenticated!' })
  }
}

export { authMiddleware }
