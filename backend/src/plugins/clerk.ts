import fp from 'fastify-plugin'
import { clerkPlugin } from '@clerk/fastify';

interface ClerkPluginOptions {
}

export default fp<ClerkPluginOptions>(async (fastify) => {
  fastify.register(clerkPlugin);
})