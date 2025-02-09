import type * as t from "@chatify/types";
import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	async findOneByEmail(email: string) {
		const user = await this.userRepository.findOneByEmail({ email });

		return user;
	}

	async createOne(user: t.Only<t.User>) {
		const newUser = await this.userRepository.createOne({ user });

		return newUser;
	}
}
