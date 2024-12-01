import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { studentValidationSchemaByZod } from '../students/student.validation.zod';
import { UserControllers } from './users.controller';

const router = express.Router();

const validateMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body.student,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-student',
  validateMiddleware(studentValidationSchemaByZod.studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
