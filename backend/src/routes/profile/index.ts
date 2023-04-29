import { getAuth } from "@clerk/fastify";
import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import {
  findUnique,
  patchUserPreferredName,
  patchUserRole,
  patchUserCity,
  patchUserIdentity,
  patchUserPronouns,
} from "../../lib/user";

const userRouter: FastifyPluginAsyncTypebox = async (
  fastify,
  _opts
): Promise<void> => {

  // resopnse schema
  const UserResponse = Type.Object({
    id: Type.Number(),
    userId: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    preferredName: Type.Union([Type.String(), Type.Null()]),
    role: Type.Union([Type.Literal("user"), Type.Literal("admin")]),
    cityId: Type.Union([Type.Number(), Type.Null()]),
    dateOfBirth: Type.Union([Type.String({ format: "date" }), Type.Null()]),
    createdAt: Type.Union([Type.String({ format: "date-time" }), Type.Date()]),
    updatedAt: Type.Union([Type.String({ format: "date-time" }), Type.Date()]),
    identity: Type.Union([
      Type.Literal("non-binary"),
      Type.Literal("transgender"),
      Type.Literal("other"),
      Type.Null(),
    ]),
    otherIdentity: Type.Union([Type.String(), Type.Null()]),
    pronouns: Type.Union([
      Type.Literal("they/them/theirs"),
      Type.Literal("she/her/hers"),
      Type.Literal("he/him/his"),
      Type.Literal("custom"),
      Type.Null(),
    ]),
    customPronouns: Type.Union([Type.String(), Type.Null()]),
  });

  // TODO: request schema needs work
  // const UserRequest = Type.Object({
  //   id: Type.Number(),
  //   userId: Type.String(),
  //   firstName: Type.String(),
  //   lastName: Type.String(),
  //   preferredName: Type.Union([Type.String(), Type.Null()]),
  //   cityId: Type.Union([Type.Number(), Type.Null()]),
  //   dateOfBirth: Type.Union([Type.String({ format: "date" }), Type.Null()]),
  //   createdAt: Type.Date(),
  //   updatedAt: Type.Date(),
  //   identity: Type.Union([
  //     Type.Literal("non-binary"),
  //     Type.Literal("transgender"),
  //     Type.Literal("other"),
  //     Type.Null(),
  //   ]),
  //   otherIdentity: Type.Union([Type.String(), Type.Null()]),
  //   pronouns: Type.Union([
  //     Type.Literal("they/them/theirs"),
  //     Type.Literal("she/her/hers"),
  //     Type.Literal("he/him/his"),
  //     Type.Literal("custom"),
  //     Type.Null(),
  //   ]),
  //   customPronouns: Type.Union([Type.String(), Type.Null()]),
  // });

  const PatchFullNameRequest = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
  });

  // reused on several nominal fields
  const PatchNameRequest = Type.Object({
    name: Type.String(),
  });

  const PatchRoleRequest = Type.Object({
    role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
  });

  const PatchDobRequest = Type.Object({
    dob: Type.String({ format: "date" }),
  });

  const PatchIdentityRequest = Type.Object({
    identity: Type.Union([
      Type.Literal("transgender"),
      Type.Literal("non-binary"),
      Type.Literal("other"),
      Type.Null(),
    ]),
    otherIdentity: Type.String(),
  });

  const PatchPronounsRequest = Type.Object({
    pronouns: Type.Union([
      Type.Literal("they/them/theirs"),
      Type.Literal("she/her/hers"),
      Type.Literal("he/him/his"),
      Type.Literal("custom"),
      Type.Null(),
    ]),
    customPronouns: Type.Union([Type.String(), Type.Null()]),
  });

  // get user profile data
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const user = await findUnique(userId);
      if (!user) {
        throw Error("User authorization found but user does not exist");
      }
      reply.status(200).send(user);
    }
  );

  // TODO: FIX create new user
  // fastify.post(
  //   "/create",
  //   {
  //     schema: {
  //       body: UserRequest,
  //       response: {
  //         201: UserResponse,
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const { userId } = getAuth(request);
  //     if (!userId) {
  //       reply.code(403).send();
  //     }
  //     const newUser = request.body;
  //     const user = await createNewUser(newUser);
  //     if (!user) {
  //       throw Error("User could not be created");
  //     }
  //     // TODO: bettter way to do this?
  //     const userRes = {
  //       ...user,
  //       createdAt: user.createdAt.toString(),
  //       updatedAt: user.updatedAt.toUTCString(),
  //     };
  //     reply.status(201).send(userRes);
  //   }
  // );

  // update user fullname
  fastify.patch(
    "/update/name",
    {
      schema: {
        body: PatchFullNameRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { firstName, lastName } = request.body;
      await patchUserFirstName(userId, firstName);
      const user = await patchUserLastName(userId, lastName);
      if (!user) {
        throw Error("User full name could not be updated");
      }
      // TODO: bettter way to do this?
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  // update user firstname
  fastify.patch(
    "/update/firstname",
    {
      schema: {
        body: PatchNameRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { name } = request.body;
      const user = await patchUserFirstName(userId, name);
      if (!user) {
        throw Error("User first name could not be updated");
      }
      // TODO: bettter way to do this?
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  fastify.patch(
    "/update/lastname",
    {
      schema: {
        body: PatchNameRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { name } = request.body;
      const user = await patchUserLastName(userId, name);
      if (!user) {
        throw Error("User last name could not be updated");
      }
      // TODO: bettter way to do this?
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  // update user preferred name
  fastify.patch(
    "/update/preferredName",
    {
      schema: {
        body: PatchNameRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { name } = request.body;
      const user = await patchUserPreferredName(userId, name);
      if (!user) {
        throw Error("User preferred name could not be updated");
      }
      // TODO: bettter way to do this?
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  fastify.patch(
    "/update/role",
    {
      schema: {
        body: PatchRoleRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = await getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { role } = request.body;
      const user = await patchUserRole(userId, role);
      if (!user) {
        throw Error("User role could not be updated");
      }
      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/city",
    {
      schema: {
        body: PatchNameRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { name } = request.body;
      const user = await patchUserCity(userId, name);
      if (!user) {
        throw Error("User city could not be updated");
      }
      // TODO: better practice for working with dates
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  fastify.patch(
    "/update/dob",
    {
      schema: {
        body: PatchDobRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { dob } = request.body;
      const user = await patchUserDOB(userId, dob);
      if (!user) {
        throw Error("User date of birth could not be updated");
      }
      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/identity",
    {
      schema: {
        body: PatchIdentityRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { identity, otherIdentity } = request.body;
      const user = await patchUserIdentity(userId, identity, otherIdentity);
      if (!user) {
        throw Error("User identity could not be updated");
      }
      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/pronouns",
    {
      schema: {
        body: PatchPronounsRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(403).send();
      }
      const { pronouns, customPronouns } = request.body;
      const user = await patchUserPronouns(userId, pronouns, customPronouns);
      if (!user) {
        throw Error("User pronouns could not be updated");
      }
      reply.status(200).send(user);
    }
  );

  //  TODO: FIX update user profile
  //  fastify.put(
  //   "/udpate/",
  //   {
  //     schema: {
  //       body: UserRequest,
  //       response: {
  //         200: UserResponse,
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const { userId } = getAuth(request);
  //     if (!userId) {
  //       return reply.code(403).send();
  //     }
  //     const newUserData = request.body;
  //     const user = await updateUser(userId, newUserData);
  //     if (!user) {
  //       throw Error("User profile could not be updated");
  //     }

  //     const userRes = {
  //       ...user,
  //       createdAt: user.createdAt.toString(),
  //       updatedAt: user.updatedAt.toUTCString(),
  //     };

  //     reply.status(200).send(userRes);
  //   }
  // );
};

export default userRouter;
