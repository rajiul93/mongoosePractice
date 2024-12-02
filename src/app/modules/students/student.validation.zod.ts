import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

// Guardian Schema
const guardianValidationSchema  = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContact: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNumber: z.string(),
  address: z.string(),
});
 

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1, { message: 'ID is required' }),

    student: z.object({
      name: userNameValidationSchema,
      // id: z.string(),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      dateOfBirth: z.string().optional(),
      profileImg: z
        .string()
        .url({ message: 'Profile image must be a valid URL' })
        .optional(),
    }),
  }),
});

export const studentValidationSchemaByZod = {
  studentValidationSchema: createStudentValidationSchema,
};
