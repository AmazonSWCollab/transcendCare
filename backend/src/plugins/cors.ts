import fp from "fastify-plugin";
import cors from "@fastify/cors";

interface CorsPluginOptions {
  origin: string;
}

export default fp<CorsPluginOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: "http://localhost:3000",
  });
});
