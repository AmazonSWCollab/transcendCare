import { eq } from "drizzle-orm";
import { db } from "../../db";
import { cities } from "../../db/schema/cities";

export async function getCity(cityName: string) {
  const citySelect = await db
    .select()
    .from(cities)
    .where(eq(cities.name, cityName));
  // Account for  invalid city name
  if (citySelect.length < 1) {
    return createCity(cityName);
  }
  return citySelect[0];
}

export async function createCity(cityName: string) {
  const insertCity = await db
    .insert(cities)
    .values({ name: cityName })
    .returning();

  if (insertCity.length < 1) {
    return null;
  }
  return insertCity[0];
}
