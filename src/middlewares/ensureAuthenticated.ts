import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token não informado.',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response.status(401).json({
      message: 'Token inválido.',
    });
  }
}

export default ensureAuthenticated;
