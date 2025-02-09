import type { Creatable } from "@chatify/types";

export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
}
