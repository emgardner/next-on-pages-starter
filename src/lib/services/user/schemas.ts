import { z } from "zod";

export const newUserSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(32, "Password must be less than 32 characters."),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password ust be at least 8 characters.",
      })
      .max(32, "Password must be less than 32 characters."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, "Password must be less than 32 characters."),
});
