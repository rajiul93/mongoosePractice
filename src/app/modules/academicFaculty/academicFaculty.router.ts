import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = Router();

router.get(
  '/all-academic-faculty',
  academicFacultyController.getAllAcademicFaculty,
);

router.get(
  '/single-academic-faculty/:facultyId',
  academicFacultyController.getSingleAcademicFaculty,
);

router.post(
  '/create-academic-faculty',
  validateMiddleware(academicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
);

router.patch(
  '/update-academic-faculty/:facultyId',
  validateMiddleware(academicFacultyValidation),
  academicFacultyController.updateSingleAcademicFaculty,
);

export const academicFacultyRouters = router;
