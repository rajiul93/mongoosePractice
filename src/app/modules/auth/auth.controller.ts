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
  const {refreshToken} = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get refresh token successful',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
};
