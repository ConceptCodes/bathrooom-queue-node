import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { userTable, insertUserSchema } from "@lib/db/schema";
import { env } from "@lib/env";

// Auth
export const loginSchema = createInsertSchema(userTable, {
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(8),
})
  .pick({
    email: true,
    password: true,
  })
  .refine((data) => {
    if (!env.COMPANY_EMAIL_ID) return true;
    return (
      data.email.substring(data.email.indexOf("@")) === env.COMPANY_EMAIL_ID
    );
  });

export const registerSchema = insertUserSchema
  .pick({
    email: true,
    password: true,
    fullName: true,
    phoneNumber: true,
  })
  .required();

export const forgotPasswordSchema = insertUserSchema.pick({
  id: true,
  email: true,
});

export const resetPasswordSchema = insertUserSchema.pick({
  id: true,
  password: true,
});

// Profile
export const updateSchema = createInsertSchema(userTable, {
  id: (schema) => schema.id.positive(),
  fullName: (schema) => schema.fullName.max(255),
}).pick({
  id: true,
  fullName: true,
});

// Subscriptions
export const onlyEmailSchema = z.object({
  email: z.string().email(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export type UpdateSchema = z.infer<typeof updateSchema>;

export type SubscribeSchema = z.infer<typeof onlyEmailSchema>;
