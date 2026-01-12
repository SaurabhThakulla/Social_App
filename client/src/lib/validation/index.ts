import * as z from "zod";

/* ---------------- Schema ---------------- */
export const SignupValidation = z.object({
  name: z.string().min(2, "Rotten Name Length"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
