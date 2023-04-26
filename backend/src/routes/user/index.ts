import { eq } from "drizzle-orm";
import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { cities } from "../../db/schema/cities";
import { users, NewUser } from "../../db/schema/users";
import { findUnique } from "../../db/queries/users";



const userRouter: FastifyPluginAsyncTypebox = async (
      fastify,
      _opts
): Promise<void> => {
    const UserResponse = Type.Object({
	    id: Type.Number(),
	    firstName: Type.String(),
	    lastName: Type.String(),
	    preferredName: Type.Optional(Type.String()),
	    role: Type.Union([Type.Literal("user"), Type.Literal("admin")]),
	    cityId: Type.Union([Type.Number(), Type.Null()]),
	    dateOfBirth: Type.String({ format: "date" }),
	    createdAt: Type.String({ format: "date-time" }),
	    updatedAt: Type.String({ format: "date-time" }),
	    identity: Type.Union([Type.Literal("non-binary"), Type.Literal("transgender"), Type.Literal("other")]),
	    otherIdentity: Type.Optional(Type.String()),
	    pronouns: Type.Union([Type.Literal("they/them/theirs"), Type.Literal("she/her/hers"), Type.Literal("he/him/his"), Type.Literal("custom")]),
	    customPronouns: Type.Optional(Type.String())
    });
    
  // get user by id
  fastify.get(
    "/:id",
    {
      schema: {
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
      const userObject = {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
      reply.status(200).send(userObject);
    }
  );

  // create new user
  fastify.post(
    "/create",
    {
      schema: {
        body: Type.Object({
          fullName: Type.String(),
          phone: Type.String(),
          city: Type.String(),
        }),
        response: {
          201: UserResponse 
        },
      },
    },
    async (request, reply) => {
      const { fullName, phone, city } = request.body;
      // get the id of the city the user names
      const citySelect = await fastify.db
        .select()
        .from(cities)
        .where(eq(cities.name, city));
      // Account for  invalid city name
      if (citySelect.length < 1) {
        const insertCity = await fastify.db
          .insert(cities)
          .values({ name: city })
          .returning();
        citySelect.push(insertCity[0]);
      }
      // create new user & insert
      const user: NewUser = {
        fullName: fullName,
        phone: phone,
        cityId: citySelect[0].id,
        role: "user",
        createdAt: new Date(),
      };
      const response = await fastify.db.insert(users).values(user).returning();
      const userRes = {
        ...response[0],
        createdAt: response[0].createdAt.toString(),
        updatedAt: response[0].updatedAt.toUTCString(),
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
          full_name: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { full_name } = request.body;
      const user_id = request.params.id;
      const user = await fastify.db
        .update(users)
        .set({ fullName: full_name, updatedAt: new Date() })
        .where(eq(users.id, user_id))
        .returning();
      const userRes = {
        ...user[0],
        createdAt: user[0].createdAt.toString(),
        updatedAt: user[0].updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

  // update user phone
  fastify.patch(
    "/:id/update/phone",
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        body: Type.Object({
          phone_number: Type.String(),
        }),
        response: {
          200: UserResponse,
        },
      },
    },
    async (request, reply) => {
      const { phone_number } = request.body;
      const user_id = request.params.id;
      const user = await fastify.db
        .update(users)
        .set({ phone: phone_number, updatedAt: new Date() })
        .where(eq(users.id, user_id))
        .returning();
      const userRes = {
        ...user[0],
        createdAt: user[0].createdAt.toString(),
        updatedAt: user[0].updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );

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
      const citySelect = await fastify.db
        .select()
        .from(cities)
        .where(eq(cities.name, city_name));
      // Account for  invalid city names
      if (citySelect.length < 1) {
        const insertCity = await fastify.db
          .insert(cities)
          .values({ name: city_name })
          .returning();
        citySelect.push(insertCity[0]);
      }
      // Now update user
      const user = await fastify.db
        .update(users)
        .set({ cityId: citySelect[0].id, updatedAt: new Date() })
        .where(eq(users.id, user_id))
        .returning();
      const userRes = {
        ...user[0],
        createdAt: user[0].createdAt.toString(),
        updatedAt: user[0].updatedAt.toUTCString(),
      };
      reply.status(200).send(userRes);
    }
  );
};

export default userRouter;
