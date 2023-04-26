import { db } from '../../index';
import { users, User } from '../../schema/users';
import { eq } from 'drizzle-orm';


export async function findUnique(id: number): Promise<User | null> {
	const userSelected = await db.select().from(users).where(eq(users.id, id));
	if (userSelected.length < 1) {
	    return null;
	}
	return userSelected[0];
}

export async function createNewUser(firstName: string, lastName: string) {
	const userSelected = await db.insert(users).values({ firstName: firstName, lastName: lastName }).returning();
	if (userSelected.length < 1) {
		return null;
	}
	return userSelected[0];
}

export async function patchUserName(id: number, firstName: string, lastName: string) {
	const userSelected = await db.update(users).where(eq(users.id, id)).values({firstName: firstName, lastName: lastName }).returning();
	if (users.length < 1) {
		return null;
	}
	return users[0];
}

export async function pathUserPreferredName(id, preferredName) {
	const users = await db.update(users).where(eq(users.id, id)).values({ users.preferredName: preferredName }).returning();
	if (users.length < 1) return null;
	return users[0];
}

