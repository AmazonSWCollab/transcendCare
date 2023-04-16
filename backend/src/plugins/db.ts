import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

interface DrizzlePluginOptions {
}

export default fp<DrizzlePluginOptions>(async (fastify) => {
  // TODO: add a Railway Postgres DB
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);
  fastify.decorate("db", db);
});
