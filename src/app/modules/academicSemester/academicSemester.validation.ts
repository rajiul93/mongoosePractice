import { z } from 'zod';
import {
    CodeAcademicSemester,
    Months,
    NameAcademicSemester,
} from './academicSemester.constants';

const CreateAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...NameAcademicSemester] as [string, ...string[]]),
    code: z.enum([...CodeAcademicSemester] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicValidation = {
  CreateAcademicSemesterSchema,
};
