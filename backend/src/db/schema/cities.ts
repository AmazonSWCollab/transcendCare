import type { InferModel } from "drizzle-orm";
import { index, sqliteTable, integer, uniqueIndex, text } from "drizzle-orm/sqlite-core";

export const cities = sqliteTable("cities", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    longitude: text("longitude").notNull(),
    latitude: text("latitude").notNull(),
  }, (cities) => {
    return {
      nameIdx: index('name_idx').on(cities.name),
      uniqueIndex: uniqueIndex('unique_idx').on(cities.name)
    }
  } 
);

export type City = InferModel<typeof cities>;
export type NewCity = InferModel<typeof cities, "insert">;
