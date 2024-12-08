import express from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { studentValidationSchemaByZod } from '../students/student.validation.zod';
import { UserControllers } from './users.controller';

const router = express.Router();


router.post(
  '/create-student',
  validateMiddleware(studentValidationSchemaByZod.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
