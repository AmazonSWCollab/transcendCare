import fp from "fastify-plugin";
import cors from "@fastify/cors";

interface CorsPluginOptions {
  origin: string;
  allowHeaders: string[]
}

export default fp<CorsPluginOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: process.env.CLIENT_ORIGIN,
    allowedHeaders: ['Authorization'],
  });
});
