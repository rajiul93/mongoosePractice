import express from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';

import { offeredCourseController } from './offerCourse.controllers';
import {
    OfferedCourseValidation,
    updateOfferedCourseValidation,
} from './offerCourse.validations';
const route = express.Router();

route.post(
  '/create-offer-course',
  validateMiddleware(OfferedCourseValidation),

  offeredCourseController.createOfferCourse,
);

route.get('/', offeredCourseController.getAllOfferCourse);
route.get('/:id', offeredCourseController.getSingleOfferCourse);

route.patch(
  '/:id',
  validateMiddleware(updateOfferedCourseValidation),
  offeredCourseController.updateOfferCourse,
);

export const offeredCourseRouters = route;
