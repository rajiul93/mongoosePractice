import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.services';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthService.loginUser(data);
  const { refreshToken, accessToken, needPasswordChanged } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.Node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'your Login successful',
    data: {
      accessToken,
      needPasswordChanged,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const data = req.body;
  const user = req.user;
  const result = await AuthService.changePassword(user, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'your your password update successful',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get refresh token successful',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userID = req.body.id;
  const result = await AuthService.forgetPassword(userID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reset link generated successful',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string
  const result = await AuthService.resetPassword(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password change successfully successful',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
