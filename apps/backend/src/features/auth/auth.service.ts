import { UserService } from "@/user/user.service";
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { UserNotFound } from "src/core/exceptions";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOneByEmail(email);
		if (!user) throw new UserNotFound();

		if (user._passwordHash !== password)
			throw new ForbiddenException("Invalid password");

		const { _passwordHash, _passwordReset, ...rest } = user;

		return rest;
	}
}
