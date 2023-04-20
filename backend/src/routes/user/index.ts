import { eq } from "drizzle-orm";
import { FastifyPluginAsync } from "fastify";
import { cities } from "../../db/schema/cities";
import { users, NewUser } from "../../db/schema/users";

interface UserInfo {
  fullName: string;
  phone: string;
  city: string;
}

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // get user by id
  fastify.get<{ Params: { id: number } }>(
    "/users/:id",
    async function (request, reply) {
      const { id } = request.params;
      const userSelect = await fastify.db
        .select()
        .from(users)
        .where(eq(users.id, id));
      reply.status(200).send({ user: userSelect[0] });
    }
  );

  // create new user
  fastify.post<{
    Body: UserInfo;
  }>("/user/create", async (request, reply) => {
    const { fullName, phone, city } = request.body;
    // get the id of the city the user names
    const citySelect = await fastify.db
      .select()
      .from(cities)
      .where(eq(cities.name, city));
    // Account for  invalid city names
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
    reply.status(201).send({ user: response[0] });
  });

  // update user fullname
  fastify.patch<{
    Body: { full_name: string };
    Params: { id: number };
  }>("/user/:id/update/name", async (request, reply) => {
    const { full_name } = request.body;
    const user_id = request.params.id;
    const user = await fastify.db
      .update(users)
      .set({ fullName: full_name, updatedAt: new Date() })
      .where(eq(users.id, user_id))
      .returning();
    reply.status(200).send({ user: user[0] });
  });

  // update user phone
  fastify.patch<{
    Body: { phone_number: string };
    Params: { id: number };
  }>("/user/:id/update/phone", async (request, reply) => {
    const { phone_number } = request.body;
    const user_id = request.params.id;
    const user = await fastify.db
      .update(users)
      .set({ phone: phone_number, updatedAt: new Date() })
      .where(eq(users.id, user_id))
      .returning();
    reply.status(200).send({ user: user[0] });
  });

  // update user city
  fastify.patch<{
    Body: { city_name: string };
    Params: { id: number };
  }>("/user/:id/update/city", async (request, reply) => {
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
    reply.status(200).send({ user: user[0] });
  });
};

export default example;
