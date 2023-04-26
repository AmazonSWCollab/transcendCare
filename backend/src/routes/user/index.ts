import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { AuthPrehandler } from "../../prehandlers/auth";
import {
  createNewUser,
  findUnique,
  patchUserCity,
  patchUserFullName,
} from "../../db/queries/user";

const userRouter: FastifyPluginAsyncTypebox = async (
  fastify,
  _opts
): Promise<void> => {
  const UserResponse = Type.Object({
    id: Type.Number(),
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

  // get user by id
  fastify.get(
    "/:id",
    {
      schema: {
        prehandler: AuthPrehandler,
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const user = await findUnique(id);
      // the case where the user id is invalid
      if (!user) {
        throw Error("User does not exist");
      }
      // otherwise send user object
      reply.status(200).send(user);
    }
  );

  // create new user
  fastify.post(
    "/create",
    {
      schema: {
        prehandler: AuthPrehandler,
        body: Type.Object({
          firstName: Type.String(),
          lastName: Type.String(),
          cityName: Type.String(),
        }),
        response: {
          201: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { firstName, lastName, cityName } = request.body;
      // create new user & insert
      const user = await createNewUser(firstName, lastName, cityName);
      // if for some reason there is an issue creating this user
      if (!user) {
        throw Error("User does not exit!");
      }
      // update the date fields
      const userRes = {
        ...user,
        createdAt: user.createdAt.toString(),
        updatedAt: user.updatedAt.toUTCString(),
      };

      reply.status(201).send(userRes);
    }
  );

  // update user fullname
  fastify.patch(
    "/:id/update/name",
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
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
      const { firstName, lastName } = request.body;
      const user_id = request.params.id;
      const user = await patchUserFullName(user_id, firstName, lastName);

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

  // // update user phone
  // fastify.patch(
  //   "/:id/update/phone",
  //   {
  //     schema: {
  //       params: Type.Object({
  //         id: Type.Number(),
  //       }),
  //       body: Type.Object({
  //         phone_number: Type.String(),
  //       }),
  //       response: {
  //         200: UserResponse,
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     const { phone_number } = request.body;
  //     const user_id = request.params.id;
  //     const user = await fastify.db
  //       .update(users)
  //       .set({ phone: phone_number, updatedAt: new Date() })
  //       .where(eq(users.id, user_id))
  //       .returning();
  //     const userRes = {
  //       ...user[0],
  //       createdAt: user[0].createdAt.toString(),
  //       updatedAt: user[0].updatedAt.toUTCString(),
  //     };
  //     reply.status(200).send(userRes);
  //   }
  // );

  // update user city
  fastify.patch(
    "/:id/update/city",
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        body: Type.Object({
          city_name: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { city_name } = request.body;
      const user_id = request.params.id;
      // get the id of the city the user names
      const user = await patchUserCity(user_id, city_name);

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
};

export default userRouter;
