import { db } from '../db';

export async fucntion findUnique(id): Promise<User | null> {
	const users = await db.select().from(users).where(eq(users.id, id));
	if (users.length < 1) {
		throw Error(`User does not exist with id: ${id}.`);
	}
	const user = users[0];
	retrurn user;
}

export async function createNewUser(firstName, lastName): Promise<User | null> {
	const users = await db.insert(users).values({ first_name: firstName, last_name: lastName }).returning();
}
