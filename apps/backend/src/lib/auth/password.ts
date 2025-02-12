import * as bcrypt from "bcrypt";

const encrypt = async (value: string) => await bcrypt.hash(value, 10);

const compare = async (value: string, hash: string) =>
	await bcrypt.compare(value, hash);

export const password = {
	encrypt,
	compare,
};
