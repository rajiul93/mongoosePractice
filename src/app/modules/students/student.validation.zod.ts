import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Name max length is 20' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: '{VALUE} is not in capitalize format' },
    ),
  middleName: z.string().min(1, { message: 'Middle name is required' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} is not valid',
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContact: z.string().min(1, { message: 'Father contact is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContact: z.string().min(1, { message: 'Mother contact is required' }),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation is required' }),
  contactNumber: z
    .string()
    .min(1, { message: 'Local guardian contact number is required' }),
  address: z.string().min(1, { message: 'Local guardian address is required' }),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1, { message: 'ID is required' }),
    student: z.object({
      name: userNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: (issue) => ({
            message: `${issue.code} is not valid. You should select a valid gender.`,
          }),
        })
        .refine((val) => !!val, { message: 'Gender is required' }),
      email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((value) => ({
          message: `${value} is not a valid email address`,
        })),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
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
