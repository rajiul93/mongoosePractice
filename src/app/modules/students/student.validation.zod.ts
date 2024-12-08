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
const guardianValidationSchema = z.object({
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
      academicSemester: z.string(),
      dateOfBirth: z.string().optional(),
      profileImg: z
        .string()
        .url({ message: 'Profile image must be a valid URL' })
        .optional(),
    }),
  }),
});

//  update validation
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});
// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContact: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContact: z.string().optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});

// Student Schema
const updateStudentValidationSchema = z.object({
  body: z.object({

    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      // id: z.string(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      academicSemester: z.string().optional(),
      dateOfBirth: z.string().optional(),
      profileImg: z
        .string()
        .url({ message: 'Profile image must be a valid URL' })
        .optional(),
    }),
  }),
});
export const studentValidationSchemaByZod = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
