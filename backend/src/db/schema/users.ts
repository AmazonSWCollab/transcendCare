import type { InferModel } from "drizzle-orm";
import { date, pgEnum } from "drizzle-orm/pg-core";
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { cities } from "./cities";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const identityEnum = pgEnum("identity", [
  "non-binary",
  "transgender",
  "other",
]);

export const pronounsEnum = pgEnum("pronouns", [
  "they/them/theirs",
  "she/her/hers",
  "he/him/his",
  "custom",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("full_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  preferredName: varchar("preferred_name", { length: 256 }),
  role: roleEnum("role").default("user").notNull(),
  cityId: integer("city_id").references(() => cities.id),
  dateOfBirth: date("date_of_birth", { mode: "string" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  identity: identityEnum("identity"),
  otherIdentity: varchar("other_identity", { length: 64 }),
  pronouns: pronounsEnum("pronouns"),
  customPronouns: varchar("custom_pronouns", { length: 32 }),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
