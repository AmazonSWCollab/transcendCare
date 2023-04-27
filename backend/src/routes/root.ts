import { FastifyPluginAsync } from "fastify";
import userRouter from "./user";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
// set prefix for all routes as api/v1
  fastify.register(userRouter, { prefix: "/api/v1/user" });
  // fastify.reqister(cityRouter, { prefix: "/api/v1/city" });
  // fastify.register(datasetRouter, { prefix: "/api/v1/dataset" });
  // fastify.register(affirmationsRouter, { prefix: "/api/v1/affirmations" });
  // fastify.register(forumPostRouter, { prefix: "/api/v1/forum" });
  // fastify.register(forumCommentRouter, { prefix: "/api/v1/forum" });
  // fastify.register(reactionRouter, { prefix: "/api/v1/reaction" });
  // fastify.reqister(appointmentRouter, { prefix: "/api/v1/appointment" });
};

export default root;
