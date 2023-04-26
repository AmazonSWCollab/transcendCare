import fp from 'fastify-plugin';
import { clerkPlugin } from '@clerk/fastify';
import { FastifyInstance } from 'fastify';

export default fp(async(fastify: FastifyInstance)  => {
  fastify.register(clerkPlugin);
});

