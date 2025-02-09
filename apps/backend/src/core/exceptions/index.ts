import { HttpException } from "@nestjs/common";

export class UserNotFound extends HttpException {
	constructor() {
		super("User not found", 404, {
			cause: "UserNotFound",
			description: "The user was not found in the database",
		});
	}
}

export class InvalidCredentials extends HttpException {
	constructor() {
		super("Invalid credentials", 403, {
			cause: "InvalidCredentials",
			description: "The email given or password provided is not valid",
		});
	}
}
