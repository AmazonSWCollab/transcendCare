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

export const identityEnum = text("identity", {
  enum: ["non-binary", "transgender", "other"],
});

export const pronounsEnum = text("pronouns", {
  enum: ["they/them/theirs", "she/her/hers", "he/him/his", "custom"],
});

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    userId: text("user_id").notNull(),
    firstName: text("full_name").notNull(),
    lastName: text("last_name").notNull(),
    preferredName: text("preferred_name"),
    role: roleEnum.default("user").notNull(),
    cityId: integer("city_id").references(() => cities.id),
    cityName: text("city_id"),
    dateOfBirth: text("date_of_birth"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    identity: identityEnum,
    otherIdentity: text("other_identity"),
    pronouns: pronounsEnum,
    customPronouns: text("custom_pronouns"),
  },
  (users) => ({
    userIdIndex: index("user_id").on(users.userId),
    cityFK: foreignKey(() => ({
      columns: [users.cityId],
      foreignColumns: [cities.id],
    })),
    cityIdNameFk: foreignKey(() => ({
      columns: [users.cityId, users.cityName],
      foreignColumns: [cities.id, cities.name],
    })),
  }),
);

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
