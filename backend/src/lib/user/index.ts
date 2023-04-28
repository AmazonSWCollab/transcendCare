import { db } from "../../db/index";
import { users, User } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import { getCity } from "../cities";

export async function findUnique(id: string): Promise<User | null> {
  const user = await db.select().from(users).where(eq(users.userId, id)).all();

  if (user.length !== 1) {
    return null;
  }
  return user[0];
}

/**
 * This function is called during the initial auth flow.
 * It takes in a new user object populated with clerkAPI data.
 */

// export async function createNewUser(user: NewUser): Promise<User | null> {
//   const userSelected = await db.insert(users).values(user).returning().all();

//   if (userSelected.length !== 1) {
//     return null;
//   }

//   return userSelected[0];
// }

/**
 * This function is called when the user updates their profile
 * either during the onboarding process or via settings page
 * or when the admin updates the user's profile in the admin page.
 */

// export async function updateUser(
//   id: string,
//   user: NewUser
// ): Promise<User | null> {
//   const userSelected = await db
//     .update(users)
//     .set(user)
//     .where(eq(users.userId, id))
//     .returning()
//     .all();

//   if (userSelected.length !== 1) {
//     return null;
//   }

//   return userSelected[0];
// }

export async function patchUserFirstName(
  id: string, 
  firstName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ firstName: firstName })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserLastName(
  id: string,
  lastName: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ lastName: lastName })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserPreferredName(
  id: string,
  preferredName?: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ preferredName: preferredName })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserRole(
  id: string,
  role: "user" | "admin"
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ role: role })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserCity(
  id: string,
  cityName: string
): Promise<User | null> {
  const city = await getCity(cityName);

  const user = await db
    .update(users)
    .set({ cityId: city?.id })
    .where(eq(users.userId, id))
    .returning().
    all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserDOB(
  id: string,
  dob: string
): Promise<User | null> {
  const user = await db
    .update(users)
    .set({ dateOfBirth: dob })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserIdentity(
  id: string,
  identity: "non-binary" | "transgender" | "other" | null,
  otherIdentity: string | null
): Promise<User | null> {
  if (identity !== "other") {
    otherIdentity = null;
  }
  const user = await db
    .update(users)
    .set({ identity: identity, otherIdentity: otherIdentity })
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}

export async function patchUserPronouns(
  id: string,
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
    .where(eq(users.userId, id))
    .returning()
    .all();

  if (user.length !== 1) {
    return null;
  }

  return user[0];
}
