import { z } from 'zod';

export const RegisterSchema = z.object({
    firstname: z.string(),
    middlename: z.string().optional(),
    lastname: z.string(),
    email: z.string().email("Invalid email format"),
    username: z.string()
      .min(6, "Username is too short!")
      .refine(data => !data.includes('@'), "Enter username, not email")
      .transform(data => data.toLowerCase()),
    password: z.string()
      .min(6, "Password is too short!")
      .refine(data => /[!@#$%^&*(),.?":{}|<>]/.test(data), "Include special characters"),
    image: z.string().optional(),
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>