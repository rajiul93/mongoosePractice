import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({required_error:"Old password is required"}),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});
