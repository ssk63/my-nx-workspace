import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../../db';
import { users } from '../../../db/schemas/users.schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env['JWT_SECRET'] || 'changeme';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    const user = await db.select().from(users).where(eq(users.id, decoded.userId));
    if (!user.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
} 