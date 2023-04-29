import type { InferModel } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  index,
  foreignKey,
} from "drizzle-orm/sqlite-core";
import { cities } from "./cities";

export const roleEnum = text("role", { enum: ["user", "admin"] });

export const profiles = sqliteTable(
  "profiles",
  {
    id: integer("id").primaryKey(),
    userId: text("user_id").notNull(),
    preferredName: text("preferred_name"),
    role: roleEnum.default("user").notNull(),
    cityId: integer("city_id").references(() => cities.id),
    cityName: text("city_id"),
    identity: text("identity"),
    pronouns: text("pronouns"),
  },
  (profiles) => ({
    userIdIndex: index("user_id").on(profiles.userId),
    cityFK: foreignKey(() => ({
      columns: [profiles.cityId],
      foreignColumns: [cities.id],
    })),
    cityIdNameFk: foreignKey(() => ({
      columns: [profiles.cityId, profiles.cityName],
      foreignColumns: [cities.id, cities.name],
    })),
  })
);

export type Profile = InferModel<typeof profiles>;
export type NewProfile = InferModel<typeof profiles, "insert">;
