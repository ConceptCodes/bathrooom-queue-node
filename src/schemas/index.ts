import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { userTable, insertUserSchema } from "@lib/db/schema";
import { env } from "@lib/env";

export const loginSchema = createInsertSchema(userTable, {
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(8),
})
  .pick({
    email: true,
    password: true,
  })
  .refine(
    (data) => {
      if (!env.COMPANY_EMAIL_ID) return true;
      return data.email.endsWith(env.COMPANY_EMAIL_ID);
    },
    {
      message: "Email is not a valid company email.",
    }
  );

export const registerSchema = insertUserSchema
  .pick({
    email: true,
    password: true,
    fullName: true,
  })
  .required()
  .refine(
    (data) => {
      if (!env.COMPANY_EMAIL_ID) return true;
      return data.email.endsWith(env.COMPANY_EMAIL_ID);
    },
    {
      message: "Email is not a valid company email.",
    }
  );

export const getByIdSchema = z.object({
  id: z.number().positive(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

