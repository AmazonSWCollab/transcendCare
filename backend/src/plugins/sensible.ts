import fp from 'fastify-plugin'
import sensible, { SensibleOptions } from '@fastify/sensible'

// This plugins adds some utilities to handle http errors
export default fp<SensibleOptions>(async (fastify) => {
  fastify.register(sensible)
});

