import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

interface FastifyEnvOptionsSchema {
  type: string;
  required: [string];
  properties: { PORT: { type: string; default: number } };
}

interface FastifyEnvOptions {
  schema: FastifyEnvOptionsSchema;
}

const schema: FastifyEnvOptionsSchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options: FastifyEnvOptions = {
  schema: schema,
};

export default fp<FastifyEnvOptions>(async (fastify) => {
  fastify.register(fastifyEnv, options);
});
