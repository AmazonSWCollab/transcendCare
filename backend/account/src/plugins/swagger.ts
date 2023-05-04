import fp from "fastify-plugin";
import fastifySwagger, { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

// Add a documentation route that generates openapi documentation
export default fp<FastifySwaggerUiOptions>(async (fastify) => {
  await fastify.register(require("@fastify/swagger"));
  await fastify.register(fastifySwagger, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) {
        next();
      },
      preHandler: function (_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
});
