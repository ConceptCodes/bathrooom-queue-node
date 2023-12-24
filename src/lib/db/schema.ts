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

// ----------------------------------------------------------------------

export const sessionTable = myPgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userTable.id),
  token: varchar("token", { length: 256 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Session = typeof sessionTable.$inferSelect;

// ----------------------------------------------------------------------

export const bathroomTable = myPgTable("bathroom", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  location: varchar("location", { length: 256 }),
  status: text("status", { enum: ["OPEN", "CLOSED", "UNAVAILABLE"] }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Bathroom = typeof bathroomTable.$inferSelect;
export type NewBathroom = typeof bathroomTable.$inferInsert;
export const insertBathroomSchema = createInsertSchema(bathroomTable);

// ----------------------------------------------------------------------

export const queueTable = myPgTable("queue", {
  id: serial("id").primaryKey(),
  bathroomId: integer("bathroom_id").references(() => bathroomTable.id),
  userId: integer("user_id").references(() => userTable.id),
  position: integer("position"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Queue = typeof queueTable.$inferSelect;
export type NewQueue = typeof queueTable.$inferInsert;
export const insertQueueSchema = createInsertSchema(queueTable);
