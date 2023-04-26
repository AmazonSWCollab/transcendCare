import { db } from '../db';

export async function findUnique(id: number): Promise<User | null> {
	const users = await db.select().from(users).where(eq(users.id, id));
	if (users.length < 1) {
	    return null;
	}
	retrurn users[0];
}

export async function createNewUser(firstName, lastName): Promise<User | null> {
	const users = await db.insert(users).values({ firstName: firstName, lastName: lastName }).returning();
	if (users.length < 1) {
		return null;
	}
	return users[0];
}

export async function patchUserName(id, firstName, lastName) {
	const users = await db.update(users).where(eq(users.id, id)).values({ users.firstName: firstName, users.lastName: lastName }).returning();
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

