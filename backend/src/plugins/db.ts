import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { db } from "../db";
import type { Database } from "better-sqlite3";

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
  }
}

interface DrizzlePluginOptions {}

const drizzlePlugin: FastifyPluginAsync<DrizzlePluginOptions> = fp(
  async (fastify) => {
    fastify.decorate("db", db);
    fastify.addHook("onClose", async (_server) => {
      console.info(`Disconnected from database: ${process.env.DATABASE_URL}`);
    });
  }
);

export default drizzlePlugin;

