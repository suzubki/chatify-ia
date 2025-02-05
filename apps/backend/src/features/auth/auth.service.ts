import type * as t from "@chatify/types";
import { eq } from "drizzle-orm";
import type { DatabaseConnection } from "src/database";
import { users } from "src/database/schema";

class UserRepository {
	constructor(private db: DatabaseConnection) {}

	async findAll(): Promise<t.Only<t.User>[]> {
		const result = await this.db.select().from(users);

		return result;
	}

	async findOneByEmail({
		email,
	}: { email: string }): Promise<t.Only<t.User> | null> {
		const result = await this.db
			.select()
			.from(users)
			.where(eq(users.email, email));

		const firstResult = result[0];

		return result[0];
	}
}

class UsersService {
	constructor(private userRepository: UserRepository) {}

	async findOneByEmail(email: string): Promise<t.Only<t.User> | null> {
		await this.userRepository.findOneByEmail({ email });

		return null;
	}
}

export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByEmail(email);

		if (user && user._passwordHash === password) {
			const { _passwordHash, _passwordReset, ...rest } = user;

			return rest;
		}

		return null;
	}
}
