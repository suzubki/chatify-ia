import { UserService } from "@/user/user.service";
import * as t from "@chatify/types";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InvalidCredentials, UserNotFound } from "src/core/exceptions";
import { generateId, hashProvider } from "src/lib/utils";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOneByEmail(email);
		if (!user) throw new UserNotFound();

		const isValidPassword = await hashProvider.compare(
			user._passwordHash,
			password,
		);
		if (!isValidPassword) throw new InvalidCredentials();

		const { _passwordHash, _passwordReset, ...rest } = user;

		return rest;
	}

	async register(email: string, password: string, name: string) {
		const passwordHashed = await hashProvider.encrypt(password);

		const userId = generateId("user");
		const newUser: t.Only<t.User> = {
			id: userId,
			email,
			name,
			_passwordHash: passwordHashed,
			_passwordReset: null,
			createdAt: new Date(),
			createdBy: userId,
			updatedAt: new Date(),
			updatedBy: userId,
			deletedBy: null,
			deleted: false,
			deletedAt: null,
		};

		const user = await this.userService.createOne(newUser);

		return user;
	}

	async login(email: string, password: string) {
		const user = await this.validateUser(email, password);

		return user;
	}
}
