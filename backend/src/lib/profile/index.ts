import { db } from "../../db/index";
import { profiles, Profile } from "../../db/schema/profile";
import { eq } from "drizzle-orm";
import { getCity } from "../cities";

/**
 * This file contains all database accessor functions
 * we want them all in one place so we can (slightly more) 
 * easily migrate databases
 */

export async function findUnique(id: string): Promise<Profile | null> {
  const profile = await db.select().from(profiles).where(eq(profiles.userId, id)).all();

  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function patchProfilePreferredName(
  id: string,
  preferredName?: string
): Promise<Profile | null> {
  const profile = await db
    .update(profiles)
    .set({ preferredName: preferredName })
    .where(eq(profiles.userId, id))
    .returning()
    .all();

  if (profile.length !== 1) {
    return null;
  }

  return profile[0];
}

export async function patchProfileRole(
  id: string,
  role: "user" | "admin"
): Promise<Profile | null> {
  const profile = await db
    .update(profiles)
    .set({ role: role })
    .where(eq(profiles.userId, id))
    .returning()
    .all();

  if (profile.length !== 1) {
    return null;
  }

  return profile[0];
}

export async function patchProfileCity(
  id: string,
  cityName: string
): Promise<Profile | null> {
  const city = await getCity(cityName);

  const profile = await db
    .update(profiles)
    .set({ cityId: city?.id })
    .where(eq(profiles.userId, id))
    .returning().
    all();

  if (profile.length !== 1) {
    return null;
  }

  return profile[0];
}

export async function patchProfileIdentity(
  id: string,
  identity: string,
): Promise<Profile | null> {
  const profile = await db
    .update(profiles)
    .set({ identity: identity })
    .where(eq(profiles.userId, id))
    .returning()
    .all();

  if (profile.length !== 1) {
    return null;
  }

  return profile[0];
}

export async function patchProfilePronouns(
  id: string,
  pronouns: string,
): Promise<Profile | null> {
  const profile = await db
    .update(profiles)
    .set({ pronouns: pronouns })
    .where(eq(profiles.userId, id))
    .returning()
    .all();

  if (profile.length !== 1) {
    return null;
  }

  return profile[0];
}
