import type { CreateUserDto } from "@chatify/types";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("/register")
	register(@Body() createUserDto: CreateUserDto) {
		return "ola";
	}

	@Post("/login")
	login(@Body() createUserDto: CreateUserDto) {
		const user = this.authService.validateUser(
			createUserDto.email,
			createUserDto.password,
		);

		return user;
	}

	@Post()
	verifySession(@Body() session: any) {}
}
