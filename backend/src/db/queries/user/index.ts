import { db } from "../../index";
import { users, User, NewUser } from "../../schema/users";
import { eq } from "drizzle-orm";
import { getCity } from "../cities";

export async function findUnique(id: number): Promise<User | null> {
  const userSelected = await db.select().from(users).where(eq(users.id, id));

  if (userSelected.length < 1) {
    return null;
  }

  return userSelected[0];
}

export async function createNewUser(
  firstName: string,
  lastName: string,
  cityName: string
): Promise<User | null> {
  const city = await getCity(cityName);
  const user: NewUser = {
    firstName: firstName,
    lastName: lastName,
    cityId: city?.id,
    role: "user",
    createdAt: new Date(),
  };
  const userSelected = await db.insert(users).values(user).returning();

  if (userSelected.length < 1) {
    return null;
  }

  return userSelected[0];
}

export async function patchUserFullName(
  id: number,
  firstName: string,
  lastName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ firstName: firstName, lastName: lastName })
    .where(eq(users.id, id))
    .returning();

  if (user.length < 1) {
    return null;
  }

  return user[0];
}

export async function patchUserPreferredName(
  id: number,
  preferredName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ preferredName: preferredName })
    .where(eq(users.id, id))
    .returning();

  if (user.length < 1) {
    return null;
  }

  return user[0];
}


export async function patchUserCity(
	id: number,
	cityName: string,
  ): Promise<User | null> {
	const city = await getCity(cityName);

	const user = await db
	  .update(users)
	  .set({ cityId: city?.id })
	  .where(eq(users.id, id))
	  .returning();
  
	if (user.length < 1) {
	  return null;
	}
  
	return user[0];
  }