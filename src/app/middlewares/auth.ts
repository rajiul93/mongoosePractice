import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../config';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/users/users.interface';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../modules/users/users.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if token send from client side
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your are not authorized!');
    }

    // now check token is valid or not
    const decoded = Jwt.verify(
      // decoded
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userRole, userId, iat } = decoded;

    const isUserExists = await User.isUserExistsByCustomId(userId);
    if (!isUserExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    if (isUserExists?.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
    }

    if (isUserExists?.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
    }

    if (
      isUserExists.passwordUpdateDate &&
      User.isJWTIssuedBeforePasswordChange(
        isUserExists.passwordUpdateDate,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your are not authorized 2!');
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'your are not authorized 3!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
