import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { AcademicController } from './academicSemester.controller';
import { AcademicValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateMiddleware(AcademicValidation.CreateAcademicSemesterSchema),
  AcademicController.createAcademicSemester,
);

export const AcademicRoutes = router;
