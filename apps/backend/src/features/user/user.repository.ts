import type * as t from "@chatify/types";
import { Inject, Injectable } from "@nestjs/common";
import { DatabaseInjector, dbConfig } from "src/database";

@Injectable()
export class UserRepository {
	constructor(@Inject(dbConfig.connectionTag) private db: DatabaseInjector) {}

	async findAll(): Promise<t.Only<t.User>[]> {
		const result = await this.db.query.users.findMany({
			where: (users, { eq }) => eq(users.deleted, false),
		});

		return result;
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
}
