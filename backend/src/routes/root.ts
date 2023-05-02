import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  // fastify.register(modRouter, { prefix: "/mods" });
};

export default root;
