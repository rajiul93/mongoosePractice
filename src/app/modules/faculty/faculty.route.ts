import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateMiddleware(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
