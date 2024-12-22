import express from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { semesterRegistrationController } from './semesterRegistration.controller';
import {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';
const route = express.Router();

route.post(
  '/create-registration',
  validateMiddleware(createSemesterRegistrationValidationSchema),

  semesterRegistrationController.createSemesterRegistration,
);

route.get('/', semesterRegistrationController.getAllSemesterRegistration);
route.get('/:id', semesterRegistrationController.getSingleSemesterRegistration);
route.patch(
  '/:id',
  validateMiddleware(updateSemesterRegistrationValidationSchema),
  semesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegistrationRouters = route;
