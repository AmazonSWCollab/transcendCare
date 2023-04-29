import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import { Account, accounts } from "../../db/schema/accounts";

/**
 * This file contains all database accessor functions for
 * the account table.  migrations can begin in schema folder
 * then update this file and all should be taken care of.
 */

export async function findUnique(id: string): Promise<Account | null> {
  const profile = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, id))
    .all();

  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function createAccount(
  id: string,  
  role: "user" | "admin",
  preferredName?: string,
  cityName?: string,
  identity?: string,
  pronouns?: string
): Promise<Account | null> {
  const profile = await db
    .insert(accounts)
    .values({
      userId: id,
      role,
      preferredName,
      cityName,
      identity,
      pronouns,
    })
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updateUser(
  id: string,  
  preferredName?: string,
  cityName?: string,
  identity?: string,
  pronouns?: string
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({
      preferredName,
      cityName,
      identity,
      pronouns,
    })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updatePreferredName(
  id: string,
  preferredName?: string
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({ preferredName: preferredName })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updateRole(
  id: string,
  role: "user" | "admin"
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({ role: role })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updateCity(
  id: string,
  cityName: string
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({ cityName: cityName })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updateIdentity(
  id: string,
  identity: string
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({ identity: identity })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}

export async function updatePronouns(
  id: string,
  pronouns: string
): Promise<Account | null> {
  const profile = await db
    .update(accounts)
    .set({ pronouns: pronouns })
    .where(eq(accounts.userId, id))
    .returning()
    .all();
  if (profile.length !== 1) {
    return null;
  }
  return profile[0];
}
