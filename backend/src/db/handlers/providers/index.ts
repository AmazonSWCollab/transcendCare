import { eq } from "drizzle-orm";
import { db } from "../../db";
import { providers, Provider } from "../../db/schema/providers";

export async function getProvider(
  providerName: string
): Promise<Provider | null> {
  const citySelect = await db
    .select()
    .from(providers)
    .where(eq(providers.name, providerName))
    .all();
  if (citySelect.length < 1) {
    return null;
  }
  return citySelect[0];
}

export async function createProvider(
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  longitude: string,
  latitude: string,
  website: string,
  email?: string,
  phone?: string,
  category?: string
): Promise<Provider | null> {
  const insertProvider = await db
    .insert(providers)
    .values({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      longitude,
      latitude,
      website,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
    .all();
  if (insertProvider.length < 1) {
    return null;
  }
  return insertProvider[0];
}

export async function updateProviderName(
  providerName: string,
  newName: string
): Promise<Provider | null> {
  const updatedProvider = await db
    .update(providers)
    .set({ name: newName })
    .where(eq(providers.name, providerName))
    .returning()
    .all();
  if (!updatedProvider) {
    return null;
  }
  return updatedProvider[0];
}
