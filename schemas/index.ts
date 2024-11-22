import { UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z
  .string()
  .min(8, { message: 'Your password must be atleast 8 characters long' })
  .max(64, {
    message: 'Your password can not be longer then 64 characters long',
  })
  .refine(
    (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
    'password should contain only alphabets and numbers'
  ),
});

export const SettingsSchema = z.object({
    name:z.optional(z.string()),
})

export const ResetSchema = z.object({
  email: z.string().email({ message: 'Incorrect email format' }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z
    .string()
    .min(8, { message: 'Your password must be atleast 8 characters long' })
    .max(64, {
      message: 'Your password can not be longer then 64 characters long',
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
      'password should contain only alphabets and numbers'
    ),
    code: z.optional(z.string()),
});

export const ContactSchema = z.object({
  mobileNo: z
    .string()
    .min(10, { message: 'Mobile number should be at least 10 digits long' })
    .max(15, { message: 'Mobile number can not exceed 15 digits' })
    .regex(/^\+?\d{10,15}$/, { message: 'Mobile number must contain only digits and optional "+" for country code' }),

  address: z
    .string()
    .min(10, { message: 'Address should be at least 10 characters long' })
    .max(200, { message: 'Address can not exceed 200 characters' }),
});


export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Incorrect email format' }),
  password: z
  .string()
  .min(8, { message: 'Your password must be atleast 8 characters long' })
  .max(64, {
    message: 'Your password can not be longer then 64 characters long',
  })
  .refine(
    (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
    'password should contain only alphabets and numbers'
  ),
  name: z
  .string()
  .min(4, { message: 'your full name must be atleast 4 characters long' }),
});