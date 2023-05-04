import { getAuth } from "@clerk/fastify";
import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import {
  findUnique,
  createAccount,
  updatePreferredName,
  updateRole,
  updateIdentity,
  updatePronouns,
  updateUser,
} from "../../db/handlers/account";

const accountRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
  _opts
): Promise<void> => {
  // resopnse schema
  const AccountResponse = Type.Object({
    id: Type.Number(),
    userId: Type.String(),
    preferredName: Type.Union([Type.String(), Type.Null()]),
    role: Type.Union([Type.Literal("user"), Type.Literal("admin")]),
    identity: Type.Union([Type.String(), Type.Null()]),
    pronouns: Type.Union([Type.String(), Type.Null()]),
  });
  // post request body
  const AccountCreateRequest = Type.Object({
    preferredName: Type.Optional(Type.String()),
    role: Type.Union([Type.Literal("user"), Type.Literal("admin")]),
    identity: Type.Optional(Type.String()),
    pronouns: Type.Optional(Type.String()),
  });
  // put request body
  const AccountUpdateRequest = Type.Object({
    preferredName: Type.Optional(Type.String()),
    identity: Type.Optional(Type.String()),
    pronouns: Type.Optional(Type.String()),
  });

  // get user profile data
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const account = await findUnique(userId);
      if (!account) {
        throw Error("User authorization found but user does not exist");
      }
      reply.status(200).send(account);
    }
  );

  // create user profile
  fastify.post(
    "/create",
    {
      schema: {
        body: AccountCreateRequest,
        response: {
          201: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { role, preferredName, identity, pronouns } = request.body;
      const account = await createAccount(
        userId,
        role,
        preferredName,
        identity,
        pronouns
      );
      if (!account) {
        throw Error("User could not be created");
      }
      reply.status(201).send(account);
    }
  );

  // update user preferred name
  fastify.patch(
    "/update/preferredName",
    {
      schema: {
        body: Type.Object({
          name: Type.String(),
        }),
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { name } = request.body;
      const account = await updatePreferredName(userId, name);
      if (!account) {
        throw Error("User preferred name could not be updated");
      }
      reply.status(200).send(account);
    }
  );

  // update user role
  fastify.patch(
    "/update/role",
    {
      schema: {
        body: Type.Object({
          role: Type.Union([Type.Literal("user"), Type.Literal("admin")]),
        }),
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { role } = request.body;
      const account = await updateRole(userId, role);
      if (!account) {
        throw Error("User role could not be updated");
      }
      reply.status(200).send(account);
    }
  );

  // update user identity
  fastify.patch(
    "/update/identity",
    {
      schema: {
        body: Type.Object({
          identity: Type.String(),
        }),
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { identity } = request.body;
      const account = await updateIdentity(userId, identity);
      if (!account) {
        throw Error("User identity could not be updated");
      }
      reply.status(200).send(account);
    }
  );

  // update user pronouns
  fastify.patch(
    "/update/pronouns",
    {
      schema: {
        body: Type.Object({
          pronouns: Type.String(),
        }),
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { pronouns } = request.body;
      const account = await updatePronouns(userId, pronouns);
      if (!account) {
        throw Error("User pronouns could not be updated");
      }
      reply.status(200).send(account);
    }
  );
  
  // update user profile
  fastify.put(
    "/udpate/",
    {
      schema: {
        body: AccountUpdateRequest,
        response: {
          200: AccountResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { preferredName, identity, pronouns } = request.body;
      const account = await updateUser(
        userId,
        preferredName,
        identity,
        pronouns
      );
      if (!account) {
        throw Error("User profile could not be updated");
      }

      reply.status(200).send(account);
    }
  );
};

export default accountRoutes;
