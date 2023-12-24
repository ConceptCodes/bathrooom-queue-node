import {
  serial,
  text,
  varchar,
  timestamp,
  integer,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const myPgTable = pgTableCreator(
  (name) => `bathroom_queue_node_${name}`
);

export const userTable = myPgTable("user", {
  id: serial("id").notNull().primaryKey(),
  fullName: text("full_name").notNull(),
  role: text("role", { enum: ["ADMIN", "USER"] })
    .notNull()
    .default("USER"),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 256 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;
export const insertUserSchema = createInsertSchema(userTable);

export const sessionTable = myPgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userTable.id),
  token: varchar("token", { length: 256 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Session = typeof sessionTable.$inferSelect;
