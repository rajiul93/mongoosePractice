import express from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidationSchemaByZod } from '../students/student.validation.zod';
import { UserControllers } from './users.controller';

const router = express.Router();


router.post(
  '/create-student',
  validateMiddleware(studentValidationSchemaByZod.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateMiddleware(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  validateMiddleware(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
