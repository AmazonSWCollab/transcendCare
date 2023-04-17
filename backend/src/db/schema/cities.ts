import type { InferModel } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export type City = InferModel<typeof cities>;
export type NewCity = InferModel<typeof cities, "insert">;
