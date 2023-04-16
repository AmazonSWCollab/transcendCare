import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { cities } from "./cities";

export const users = pgTable("users", {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  cityId: integer('city_id').references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});