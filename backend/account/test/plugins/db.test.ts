import { test } from "tap";
import Fastify from "fastify";
import db from "../../src/plugins/db";

test("select users", async (t) => {
  const fastify = Fastify();
  void fastify.register(db);
  await fastify.ready();
  t.pass('Database is connected...')
});
