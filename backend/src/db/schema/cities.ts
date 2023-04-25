import type { InferModel } from "drizzle-orm";
import { index, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const cities = pgTable("cities", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
  }, (cities) => {
    return {
      nameIdx: index('name_idx').on(cities.name),
      uniqueIndex: uniqueIndex('unique_idx').on(cities.name)
    }
  } 
);

export type City = InferModel<typeof cities>;
export type NewCity = InferModel<typeof cities, "insert">;
