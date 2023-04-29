import { eq } from "drizzle-orm";
import { db } from "../../db";
import { cities, City } from "../../db/schema/cities";

export async function getCity(cityName: string): Promise<City | null> {
  const citySelect = await db
    .select()
    .from(cities)
    .where(eq(cities.name, cityName))
    .all();
  // Account for  invalid city name
  if (citySelect.length < 1) {
    return createCity(cityName);j
  }
  return citySelect[0];
}

export async function createCity(cityName: string, cityLongitude: string, cityLatitude: string) {
  const insertCity = await db
    .insert(cities)
    .values({
      name: cityName,
      longitude: cityLongitude,
      latitude: cityLatitude
    })
    .returning()
    .all();

  if (insertCity.length < 1) {
    return null;
  }
  return insertCity[0];
}

export async function updateCityName(cityName: string, newName: string) {
  const updatedCity = await db
    .update(cities)
    .set({ name: newName })
    .where(eq(cities.name, cityName))
    .returning()
    .all();
  if (!updatedCity) {
    return null;
  }

  return updatedCity[0];
}

