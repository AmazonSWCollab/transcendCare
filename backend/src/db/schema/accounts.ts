import type { InferModel } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  index,
} from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable(
  "accounts",
  {
    id: integer("id").primaryKey(),
    userId: text("user_id").notNull(),
    preferredName: text("preferred_name"),
    role: text("role", { enum: ["user", "admin"] })
      .default("user")
      .notNull(),
    cityName: text("city_name"),
    identity: text("identity"),
    pronouns: text("pronouns"),
  },
  (accounts) => ({
    userIdIndex: index("user_id").on(accounts.userId),
  })
);

export type Account = InferModel<typeof accounts>;
export type NewAccount = InferModel<typeof accounts, "insert">;
