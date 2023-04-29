import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { InferModel } from "drizzle-orm";

export const providers = sqliteTable(
  "providers",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zip: text("zip").notNull(),
    longitude: text("longitude").notNull(),
    latitude: text("latitude").notNull(),
    website: text("website").notNull(),
    category: text("category"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  },
  (providers) => ({
    uniqueName: index("name").on(providers.name),
    uniqueEmail: index("email").on(providers.email),
    uniquePhone: index("phone").on(providers.phone),
    uniqueWebsite: index("website").on(providers.website),
  })
);

export type Provider = InferModel<typeof providers>;
export type NewProvider = InferModel<typeof providers, "insert">;
