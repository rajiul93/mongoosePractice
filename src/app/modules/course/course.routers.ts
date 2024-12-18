import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { courseController } from './course.controllers';
import { CourseValidation } from './course.validations';

const router = Router();

router.get('/', courseController.getAllFaCourse);

router.get('/:id', courseController.getSingleCourse);

router.post(
  '/create-course',
  validateMiddleware(CourseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

router.patch(
  '/:id',
  validateMiddleware(CourseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  validateMiddleware(CourseValidation.updateCourseValidationSchema),
  courseController.deleteCourse,
);

export const courseRouters = router;
