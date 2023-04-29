import { drizzle } from "drizzle-orm/better-sqlite3";
export { sql } from "drizzle-orm/sql";
import Database from "better-sqlite3";

const sqlite = new Database("dev.db");

export const db = drizzle(sqlite, {
  logger: process.env.NODE_ENV !== "production",
});
