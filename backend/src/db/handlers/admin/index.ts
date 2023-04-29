import { db } from '../../db/index';
import { eq, and } from 'drizzle-orm';
import { admins } from "../../db/schema/admin";
import bcrypt from 'bcrypt';

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
    .where(
      and(
        eq(admins.id, id),
        eq(admins.accountId, accId)
      )
    );
  if (!admin) {
    return false;
  }
  return true;
}

