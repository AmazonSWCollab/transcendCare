import fp from "fastify-plugin";
import cors from "@fastify/cors";

// interface CorsPluginOptions {
  // origin: string;
  // allowHeaders: string[]
// }

export default fp(async (fastify) => {
  fastify.register(cors
    // allowedHeaders: ['Authorization'],
  );
});

