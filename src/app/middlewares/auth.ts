import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith('secret ')) {
      throw new Error('Unauthorized: No token provided');
    }

    const decoded = jwt.verify(accessToken, 'secret') as {
      id: string;
      role: string;
    };

    req.user = decoded;
    next(); // ✅ let Express continue
  } catch (error) {
    next(error); // ✅ pass error to error handler
  }
};
