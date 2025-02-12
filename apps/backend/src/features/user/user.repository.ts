import type * as t from "@chatify/types";
import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DatabaseInjector, dbConfig } from "src/database";
import { users } from "src/database/schema";

@Injectable()
export class UserRepository {
	constructor(@Inject(dbConfig.connectionTag) private db: DatabaseInjector) {}

	async findAll(): Promise<t.Only<t.User>[]> {
		const result = await this.db.query.users.findMany({
			where: (users, { eq }) => eq(users.deleted, false),
		});

		return result;
	}

	async findOneById({ id }: { id: t.UserId }): Promise<t.Only<t.User> | null> {
		const row = await this.db.query.users.findFirst({
			where: eq(users.id, id),
		});

		if (!row) {
			return null;
		}

		return row;
	}

	async findOneByEmail({
		email,
	}: { email: string }): Promise<t.Only<t.User> | null> {
		const row = await this.db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, email),
		});

		if (!row) {
			return null;
		}

		return row;
	}

	async createOne({ user }: { user: t.Only<t.User> }): Promise<t.Only<t.User>> {
		const result = await this.db.insert(users).values([user]).returning();

		return result[0];
	}
}
