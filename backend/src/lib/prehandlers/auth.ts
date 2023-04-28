import { FastifyRequest, FastifyReply } from "fastify";
import { getAuth } from "@clerk/fastify";

export async function AuthPrehandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sessionId } = getAuth(request);
  if (!sessionId) {
    reply.status(401).send({ error: "Verification failed" });
  }
}
