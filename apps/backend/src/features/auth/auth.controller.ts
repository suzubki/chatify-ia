import type { CreateUserDto } from "@/user/dtos/user.dto";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { SchemaValidationPipe } from "src/core/pipes/schema-validation.pipe";
import {
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
	async login(@Body() email: string, password: string) {
		const user = await this.authService.login(email, password);

		return user;
	}

	@Post()
	async verifySession(@Body() session: any) {}
}
