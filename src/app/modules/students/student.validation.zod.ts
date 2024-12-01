import { z } from 'zod';

// UserName Schema
const userNameSchema = z.object({
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
const guardianSchema = z.object({
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
const localGuardianSchema = z.object({
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
const studentValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    name: userNameSchema,
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
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z
      .string()
      .url({ message: 'Profile image must be a valid URL' })
      .optional(),
  }),
});

export const studentValidationSchemaByZod = {
  studentValidationSchema,
};
