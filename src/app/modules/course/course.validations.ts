import { z } from 'zod';

const PreRequisiteCoursesSchema = z.object({
  courseID: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(PreRequisiteCoursesSchema).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(PreRequisiteCoursesSchema).optional(),
  }),
});

const CourseFacultiesSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  CourseFacultiesSchema,
};
