import type { CreateUserDto } from "@/user/dtos/user.dto";
import { Body, Controller, Post, Req, Res, UsePipes } from "@nestjs/common";
import type { Request, Response } from "express";
import { coreConfig } from "src/core/config/config";
import { COOKIES } from "src/core/config/constants";
import { SchemaValidationPipe } from "src/core/pipes/schema-validation.pipe";
import { session } from "src/lib/auth/session";
import {
	type LoginUserSchema,
	createUserSchema,
	loginUserSchema,
} from "src/shared/user-validation.schema";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/register")
	@UsePipes(new SchemaValidationPipe(createUserSchema))
	async register(@Body() createUserDto: CreateUserDto) {
		const user = await this.authService.register(
			createUserDto.email,
			createUserDto.password,
			createUserDto.name,
		);

		return user;
	}

	@Post("/login")
	@UsePipes(new SchemaValidationPipe(loginUserSchema))
	async webLoginWithCredentials(
		@Body() data: LoginUserSchema,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.webLoginWithCredentials(data.email, data.password);

		session.setResponseCookie(res, {
			name: COOKIES.ACCESS_TOKEN,
			token: accessToken,
			duration: coreConfig.tokens.duration.accessToken.miliSeconds,
		});

		session.setResponseCookie(res, {
			name: COOKIES.REFRESH_TOKEN,
			token: refreshToken,
			duration: coreConfig.tokens.duration.refreshToken.miliSeconds,
		});

		return { user };
	}

	@Post("/validate-session")
	async validateSession(@Req() req: Request, @Res() res: Response) {
		const { refreshed, accessToken } = await this.authService.validateSession(
			req.cookies.access_token,
			req.cookies.refresh_token,
			() => {
				this.destroySession(res);
			},
		);

		if (refreshed) {
			session.setResponseCookie(res, {
				name: COOKIES.ACCESS_TOKEN,
				token: accessToken,
				duration: coreConfig.tokens.duration.accessToken.miliSeconds,
			});
		}

		return res.status(200).send();
	}

	// Destroy the session by clearing the cookies
	async destroySession(@Res() res: Response) {
		session.clearResponseCookie(res, COOKIES.ACCESS_TOKEN);
		session.clearResponseCookie(res, COOKIES.REFRESH_TOKEN);
	}
}
