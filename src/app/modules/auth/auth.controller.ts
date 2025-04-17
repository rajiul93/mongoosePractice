import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const data = req.body; 
  const result = await AuthService.loginUser(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'your Login successful',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const data = req.body;  
  const user = req.user
  const result = await AuthService.changePassword(user ,data );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'your your password update successful',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword
};
