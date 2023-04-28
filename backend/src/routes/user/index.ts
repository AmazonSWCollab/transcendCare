import { getAuth } from "@clerk/fastify";
import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { AuthPrehandler } from "../../lib/prehandlers/auth";
import {
  // createNewUser,
  findUnique,
  patchUserFirstName,
  patchUserLastName,
  patchUserPreferredName,
  patchUserRole,
  patchUserCity,
  patchUserDOB,
  patchUserIdentity,
  patchUserPronouns,
  // updateUser,
} from "../../lib/user";

const userRouter: FastifyPluginAsyncTypebox = async (
  fastify,
  _opts
): Promise<void> => {
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

  // get user by id
  fastify.get(
    "/",
    {
      schema: {
        prehandler: AuthPrehandler,
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const user = await findUnique(userId);
      // the case where the user id is invalid
      if (!user) {
        throw Error("User does not exist");
      }
      // otherwise send user object
      reply.status(200).send(user);
    }
  );

  // // create new user
  // fastify.post(
  //   "/create",
  //   {
  //     schema: {
  //       prehandler: AuthPrehandler,
  //       body: UserRequest,
  //       response: {
  //         201: UserResponse,
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const { userId } = getAuth(request);

  //     if (!userId) {
  //       throw Error("User does not exist");
  //     }

  //     const newUser = request.body;
  //     // create new user & insert
  //     const user = await createNewUser(newUser);
  //     // if for some reason there is an issue creating this user
  //     if (!user) {
  //       throw Error("User does not exit!");
  //     }
  //     // update the date fields
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
        prehandler: AuthPrehandler,
        body: Type.Object({
          firstName: Type.String(),
          lastName: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { firstName, lastName } = request.body;
      await patchUserFirstName(userId, firstName);
      const user = await patchUserLastName(userId, lastName);

      if (!user) {
        throw Error("User does not exist");
      }

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
        prehandler: AuthPrehandler,
        body: Type.Object({
          firstName: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { firstName } = request.body;
      const user = await patchUserFirstName(userId, firstName);

      if (!user) {
        throw Error("User does not exist");
      }

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
        prehandler: AuthPrehandler,
        body: Type.Object({
          lastName: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { lastName } = request.body;
      const user = await patchUserFirstName(userId, lastName);

      if (!user) {
        throw Error("User does not exist");
      }

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
        body: Type.Object({
          preferredName: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { preferredName } = request.body;

      const user = await patchUserPreferredName(userId, preferredName);

      if (!user) {
        throw Error("User does not exit");
      }

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
        prehandler: AuthPrehandler,
        body: Type.Object({
          role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { role } = request.body;
      const user = await patchUserRole(userId, role);

      if (!user) {
        throw Error("User does not exist");
      }

      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/city",
    {
      schema: {
        prehandler: AuthPrehandler,
        body: Type.Object({
          city_name: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { city_name } = request.body;
      // get the id of the city the user names
      const user = await patchUserCity(userId, city_name);

      if (!user) {
        throw Error("User does not exist");
      }

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
        prehandler: AuthPrehandler,
        body: Type.Object({
          dob: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { dob } = request.body;
      const user = await patchUserDOB(userId, dob);

      if (!user) {
        throw Error("User does not exist");
      }

      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/identity",
    {
      schema: {
        prehandler: AuthPrehandler,
        body: Type.Object({
          identity: Type.Union([
            Type.Literal("transgender"),
            Type.Literal("non-binary"),
            Type.Literal("other"),
            Type.Null(),
          ]),
          otherIdentity: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { identity, otherIdentity } = request.body;
      const user = await patchUserIdentity(userId, identity, otherIdentity);

      if (!user) {
        throw Error("User does not exist");
      }

      reply.status(200).send(user);
    }
  );

  fastify.patch(
    "/update/pronouns",
    {
      schema: {
        prehandler: AuthPrehandler,
        body: Type.Object({
          pronouns: Type.Union([
            Type.Literal("they/them/theirs"),
            Type.Literal("she/her/hers"),
            Type.Literal("he/him/his"),
            Type.Literal("custom"),
            Type.Null(),
          ]),
          customPronouns: Type.Union([Type.String(), Type.Null()]),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { userId } = getAuth(request);

      if (!userId) {
        throw Error("User does not exist");
      }

      const { pronouns, customPronouns } = request.body;
      const user = await patchUserPronouns(userId, pronouns, customPronouns);

      if (!user) {
        throw Error("User does not exist");
      }

      reply.status(200).send(user);
    }
  );

  // fastify.put(
  //   "/udpate/",
  //   {
  //     schema: {
  //       prehandler: AuthPrehandler,
  //       body: UserRequest,
  //       response: {
  //         200: UserResponse,
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const newUserData = request.body;
  //     const { userId } = getAuth(request);

  //     if (!userId) {
  //       throw Error("User does not exist");
  //     }

  //     const user = await updateUser(userId, newUserData);

  //     if (!user) {
  //       throw Error("User does not exist");
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
