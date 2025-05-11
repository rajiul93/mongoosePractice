import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { courseController } from './course.controllers';
import { CourseValidation } from './course.validations';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = Router();

router.get('/', courseController.getAllFaCourse);

router.get('/:id', courseController.getSingleCourse);

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateMiddleware(CourseValidation.createCourseValidationSchema),
  courseController.createCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateMiddleware(CourseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validateMiddleware(CourseValidation.CourseFacultiesSchema),
  courseController.assignsCourseFaculties,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  validateMiddleware(CourseValidation.updateCourseValidationSchema),
  courseController.deleteCourse,
);

export const courseRouters = router;
