import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { USER_ROLE } from '../users/user.constant';
import { authController } from './auth.controller';
import { ZodAuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateMiddleware(ZodAuthValidation.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateMiddleware(ZodAuthValidation.changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  '/refresh-token',
  validateMiddleware(ZodAuthValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

router.post(
  '/forget-password',
  validateMiddleware(ZodAuthValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
);
router.post(
  '/reset-password',
  validateMiddleware(ZodAuthValidation.resetPasswordValidationSchema),
  authController.resetPassword,
);

export const AuthRoute = router;
