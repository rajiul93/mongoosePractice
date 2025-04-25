import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { USER_ROLE } from '../users/user.constant';
import { authController } from './auth.controller';
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateMiddleware(loginValidationSchema),
  authController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateMiddleware(changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  "/refresh-token",
  validateMiddleware(refreshTokenValidationSchema),
  authController.refreshToken,
)

export const AuthRoute = router;
