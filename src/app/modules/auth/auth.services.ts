import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../users/users.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.isUserExistsByCustomId(payload.id);
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
    !(await User.isPasswordMatched(payload.password, isUserExists?.password))
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user password is not matched',
    );
  }
  const jwtPayload = {
    userId: isUserExists.id,
    userRole: isUserExists.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );
 
  return {
    accessToken,
    refreshToken,
    needPasswordChanged: isUserExists.needsPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const isUserExists = await User.isUserExistsByCustomId(user.userId);

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
    !(await User.isPasswordMatched(payload.oldPassword, isUserExists?.password))
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user password is not matched',
    );
  }

  // hash new password
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.userRole,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordUpdateDate: new Date(),
    },
  );
  return null;
};

export const AuthService = {
  loginUser,
  changePassword,
};
