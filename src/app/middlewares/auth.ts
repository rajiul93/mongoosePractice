import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';

import httpStatus from 'http-status';
import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/users/users.interface';
import { catchAsync } from '../utils/catchAsync';
export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if token send from client side
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your are not authorized!');
    }

    // now check token is valid or not 
    const decoded = Jwt.verify( // decoded
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const role = decoded.userRole;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your are not authorized 3!');
    }
   
    req.user = decoded as JwtPayload;
    next();
    // ............

    // next();
  });
};
