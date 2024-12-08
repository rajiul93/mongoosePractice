import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validation.middlewares';
import { academicDepartmentController } from './academicDepartment.controller';
import {
  // CreateAcademicDepartmentValidation,
  UpdateAcademicDepartmentValidation,
} from './academicDepartment.validation';

const router = Router();

router.get('/', academicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

router.post(
  '/',
  // validateMiddleware(CreateAcademicDepartmentValidation),
  academicDepartmentController.createAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateMiddleware(UpdateAcademicDepartmentValidation),
  academicDepartmentController.updateSingleAcademicDepartment,
);

export const academicDepartmentRouters = router;
