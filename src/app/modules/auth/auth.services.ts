import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../users/users.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import Jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
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
const refreshToken = async (token: string) => {
  // now check token is valid or not
  const decoded = Jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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
  const jwtPayload = {
    userId: isUserExists.id,
    userRole: isUserExists.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );
  return {
    accessToken,
  };
};
const forgetPassword = async (userID: string) => {
  const isUserExists = await User.isUserExistsByCustomId(userID);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  if (isUserExists?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }
  const jwtPayload = {
    userId: isUserExists.id,
    userRole: isUserExists.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '30m',
  );
  const resetUiLink = `${config.rest_password_ui_link}/?id=${isUserExists.id}&token=${resetToken}`;
  sendEmail(isUserExists.email, resetUiLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const isUserExists = await User.isUserExistsByCustomId(payload?.id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  if (isUserExists?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  if (isUserExists?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const decoded = Jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload.id !== decoded.userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Yor id issue clint id and token id',
    );
  }
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.userRole,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordUpdateDate: new Date(),
    },
  );
};
export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
