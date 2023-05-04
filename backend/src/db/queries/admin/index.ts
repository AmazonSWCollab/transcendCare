import { db } from "../../index";
import { eq, and } from "drizzle-orm";
import { admins, Admin } from "../../schema/admin";
// strore password as hash
import bcrypt from "bcrypt";
const saltRounds = 12;

export async function setPassword(
  id: number,
  accId: number,
  password: string
): Promise<boolean> {
  const hash = await bcrypt.hash(password, saltRounds);
  const admin = await db
    .update(admins)
    .set({ password: hash })
    .where(and(eq(admins.id, id), eq(admins.accountId, accId)));
  if (!admin) {
    return false;
  }
  return true;
}

export async function signIn(accountId: number, password: string) {
  const admin: Admin[] = await db
    .select()
    .from(admins)
    .where(eq(admins.accountId, accountId))
    .all();
  if (!admin[0]) {
    return false;
  }
  const match = await bcrypt.compare(password, admin[0].password);
  if (!match) {
    return false;
  }
  return true;
}
