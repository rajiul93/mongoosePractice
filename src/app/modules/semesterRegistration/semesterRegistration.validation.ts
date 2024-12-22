import { z } from 'zod';

export const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'academicSemester is required',
    }),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'academicSemester is required',
    }).optional(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});
