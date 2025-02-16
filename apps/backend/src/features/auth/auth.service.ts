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

	/**
	 * Validate the user using email and password.
	 * @param email
	 * @param password
	 * @returns
	 */
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

	/**
	 * Login the user using email and password (Credentials).
	 * It validates the user and creates a web session.
	 *
	 * @param email
	 * @param password
	 * @returns
	 */
	async webLoginWithCredentials(email: string, password: string) {
		const user = await this.validateUser(email, password);
		const { accessToken, refreshToken } = await this.createWebSession(user);

		return { user, accessToken, refreshToken };
	}

	/**
	 * Create tokens for the user. But it doesn't validate the user.
	 *
	 * @param id
	 * @param name
	 * @param email
	 * @returns
	 */
	async createWebSession({
		id,
		name,
		email,
	}: { id: t.UserId; name: string; email: string }) {
		const accessToken = auth.token.generate({ id, email, name }, "access");
		const refreshToken = auth.token.generate({ id }, "refresh");

		return { accessToken, refreshToken };
	}

	/**
	 * Validate the web session token, either access or refresh.
	 *
	 * @param token
	 * @returns
	 */
	async validateWebSessionToken(token: string) {
		const { data, success } = await auth.token.validateAndParse(token);
		if (!data || !success) throw new InvalidCredentials();

		return { success, data };
	}

	/**
	 * Refresh the web session for the user.
	 *
	 * @param userId
	 * @returns
	 */
	async refreshWebSession(userId: t.UserId) {
		const user = await this.findUserById(userId);

		const { accessToken, refreshToken: newRefreshToken } =
			await this.createWebSession(user);

		return { accessToken, refreshToken: newRefreshToken };
	}

	/**
	 * Try to validate the session using tokens from the request and refresh session if possible.
	 * If the access token is invalid, it tries to refresh the session using the refresh token.
	 * If the refresh token is invalid, it throws an UnauthorizedException.
	 * If the access token is expired, it refreshes the session.
	 *
	 * @param accessToken
	 * @param refreshToken
	 * @param onError
	 * @returns
	 */
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
