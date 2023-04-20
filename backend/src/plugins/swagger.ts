import fp from "fastify-plugin";
import fastifySwagger, { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export default fp<FastifySwaggerUiOptions>(async (fastify) => {
  await fastify.register(require("@fastify/swagger"));
  await fastify.register(fastifySwagger, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});
