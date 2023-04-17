import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
export { sql } from "drizzle-orm/sql";
import postgres from "postgres";

export const pgClient = postgres(process.env.DATABASE_URL!);

export const db: PostgresJsDatabase = drizzle(pgClient, {
  logger: process.env.NODE_ENV !== "production",
});
