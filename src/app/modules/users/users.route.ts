import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidationSchemaByZod } from '../students/student.validation.zod';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './users.controller';

const router = express.Router();


router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateMiddleware(studentValidationSchemaByZod.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateMiddleware(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  // auth(USER_ROLE.admin), come super admin
  validateMiddleware(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
