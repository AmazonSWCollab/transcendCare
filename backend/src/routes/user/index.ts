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
  fastify.get("/users/:id", async function (request, reply) {
    return "this is an example";
  });
  // create new user
  fastify.post<{
    Body: UserInfo;
  }>("/user", async (request, reply) => {
    const { fullName, phone, city } = request.body;
    // get the id of the city the user names
    // TODO: account for  invalid cities
    const citySelect = await fastify.db
      .select()
      .from(cities)
      .where(eq(cities.name, city));
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
};

export default example;
