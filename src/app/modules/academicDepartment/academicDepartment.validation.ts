import { z } from 'zod';

export const CreateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: ' Academic Department must be string',
      required_error: 'Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: ' Academic Faculty issue',
      required_error:
        'Without available academic faculty you cant create department ',
    }),
  }),
});
export const UpdateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: ' Academic Department must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: ' Academic Faculty issue',
      })
      .optional(),
  }),
});
