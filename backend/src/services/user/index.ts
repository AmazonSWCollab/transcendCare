import { db } from "../../db/index";
import { users, User, NewUser } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import { getCity } from "../cities";

export async function findUnique(id: number): Promise<User | null> {
  const user = await db.select().from(users).where(eq(users.id, id));

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

/**
 * This function is called during the initial auth flow.
 * It takes in a new user object populated with clerkAPI data.
 */

export async function createNewUser(user: NewUser): Promise<User | null> {
  const userSelected = await db.insert(users).values(user).returning();

  if (userSelected.length !== 1) {
    return null;
  }

  return userSelected[0];
}

/**
 * This function is called when the user updates their profile
 * either during the onboarding process or via settings page
 * or when the admin updates the user's profile in the admin page.
 */

export async function updateUser(
  id: number,
  user: NewUser
): Promise<User | null> {
  const userSelected = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning();

  if (userSelected.length !== 1) {
    return null;
  }

  return userSelected[0];
}

export async function patchUserFirstName(
  id: number,
  firstName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ firstName: firstName })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserLastName(
  id: number,
  lastName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ lastName: lastName })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserPreferredName(
  id: number,
  preferredName: string | null
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ preferredName: preferredName })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserRole(
  id: number,
  role: "user" | "admin"
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ role: role })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserCity(
  id: number,
  cityName: string
): Promise<User | null> {
  const city = await getCity(cityName);

  const user = await db
    .update(users)
    .set({ cityId: city?.id })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserDOB(
  id: number,
  dob: Date | null
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ dateOfBirth: dob?.toISOString() })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserIdentity(
  id: number,
  identity: "non-binary" | "transgender" | "other" | null,
  otherIdentity: string | null
): Promise<User | null> {
  if (identity !== "other") {
    otherIdentity = null;
  }
  const user = await db
    .update(users)
    .set({ identity: identity, otherIdentity: otherIdentity })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserPronouns(
  id: number,
  pronouns:
    | "they/them/theirs"
    | "she/her/hers"
    | "he/him/his"
    | "custom"
    | null,
  customPronouns: string | null
): Promise<User | null> {
  if (pronouns !== "custom") {
    customPronouns = null;
  }
  const user = await db
    .update(users)
    .set({ pronouns: pronouns, customPronouns: customPronouns })
    .where(eq(users.id, id))
    .returning();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}
