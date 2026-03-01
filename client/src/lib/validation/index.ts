import * as z from "zod";

// For signup 
export const SignupValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// For login 
export const LoginValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});