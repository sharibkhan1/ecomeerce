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
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN , UserRole.USER]),
    email: z.optional(z.string().email({ message: 'Incorrect email format' })),
    password: z.optional(z
    .string()
    .min(8, { message: 'Your password must be atleast 8 characters long' })
    .max(64, {
      message: 'Your password can not be longer then 64 characters long',
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
      'password should contain only alphabets and numbers'
    ),),
    newPassword: z.optional(z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),)
})
  .refine((data)=>{
    if(data.password && !data.newPassword){
      return false;
    }
    return true;
  },{
    message: "New password is required!",
    path:["newPassword"]
  })
  .refine((data)=>{
    if(data.newPassword && !data.password){
      return false;
    }
    return true;
  },{
    message: "password is required!",
    path:["password"]
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