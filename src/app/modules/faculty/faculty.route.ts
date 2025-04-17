import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/', auth(), FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateMiddleware(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
