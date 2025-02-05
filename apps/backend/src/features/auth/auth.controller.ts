import type { CreateUserDto } from "@chatify/types";
import { Body, Post } from "@nestjs/common";

class AuthService {}

export class AuthController {
	constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {}

  @Post()
  login(@Body() createUserDto: CreateUserDto) {
    
  }

  @Post()
  verifySession(@Body() session: any) {
    
  }
}
