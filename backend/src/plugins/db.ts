import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { db, pgClient } from "../db";

declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase;
  }
}

interface DrizzlePluginOptions {}

const drizzlePlugin: FastifyPluginAsync<DrizzlePluginOptions> = fp(
  async (fastify) => {
    fastify.decorate("db", db);
    fastify.addHook("onClose", async (server) => {
      console.info(`Disconnected from database: ${process.env.DATABASE_URL}`);
      pgClient.end();
    });
  }
);

export default drizzlePlugin;
