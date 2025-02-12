import { UserService } from "@/user/user.service";
import * as t from "@chatify/types";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InvalidCredentials, UserNotFound } from "src/core/exceptions";
import { auth } from "src/lib/auth";
import { generateId } from "src/lib/utils";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async findUserById(id: t.UserId) {
		const user = await this.userService.findOneById(id);
		if (!user) throw new UserNotFound();

		return user;
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOneByEmail(email);
		if (!user) throw new UserNotFound();

		const isValidPassword = await auth.password.compare(
			password,
			user._passwordHash,
		);
		if (!isValidPassword) throw new InvalidCredentials();

		const { _passwordHash, _passwordReset, ...rest } = user;

		return rest;
	}

	async register(email: string, password: string, name: string) {
		const passwordHashed = await auth.password.encrypt(password);

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

	async webLoginWithCredentials(email: string, password: string) {
		const user = await this.validateUser(email, password);
		const { accessToken, refreshToken } = await this.createWebSession(user);

		return { user, accessToken, refreshToken };
	}

	async createWebSession({
		id,
		name,
		email,
	}: { id: t.UserId; name: string; email: string }) {
		const accessToken = auth.token.generate({ id, email, name }, "access");
		const refreshToken = auth.token.generate({ id }, "refresh");

		return { accessToken, refreshToken };
	}

	async validateWebSessionToken(token: string) {
		const { data, success } = await auth.token.validateAndParse(token);
		if (!data || !success) throw new InvalidCredentials();

		return { success, data };
	}

	async refreshWebSession(userId: t.UserId) {
		const user = await this.findUserById(userId);

		const { accessToken, refreshToken: newRefreshToken } =
			await this.createWebSession(user);

		return { accessToken, refreshToken: newRefreshToken };
	}

	async validateSession(
		accessToken: string,
		refreshToken: string,
		onError?: () => void,
	) {
		if (!refreshToken?.trim()) {
			onError?.();
			throw new UnauthorizedException();
		}

		const { data: validRefreshToken, success: isRefreshValid } =
			await this.validateWebSessionToken(refreshToken);

		if (!isRefreshValid || !validRefreshToken) {
			onError?.();
			throw new UnauthorizedException();
		}

		const userId = validRefreshToken.sub as t.UserId;
		if (!accessToken) {
			const session = await this.refreshWebSession(userId);

			return { refreshed: true, ...session };
		}

		const { data: validAccessToken, success: isAccessValid } =
			await this.validateWebSessionToken(accessToken);

		if (!isAccessValid || !validAccessToken) {
			onError?.();

			throw new UnauthorizedException();
		}

		const now = Math.floor(Date.now() / 1000);
		if (validAccessToken.exp < now - 60 * 15) {
			const session = await this.refreshWebSession(userId);

			return { refreshed: true, ...session };
		}

		return {
			refreshed: false,
			accessToken,
			refreshToken,
		};
	}
}
