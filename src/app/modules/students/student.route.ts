import express from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { StudentController } from './student.controller';
import { studentValidationSchemaByZod } from './student.validation.zod';

const route = express.Router();

route.get('/', StudentController.getAllStudents);
route.get('/:email', StudentController.getSingleStudents);
route.delete('/:studentId', StudentController.deleteStudent);
route.patch(
  '/:studentId',
  validateMiddleware(
    studentValidationSchemaByZod.updateStudentValidationSchema,
  ),
  StudentController.updateStudent,
);

export const StudentRoutes = route;
