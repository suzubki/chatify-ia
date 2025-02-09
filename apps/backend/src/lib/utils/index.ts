import { Entities, Id } from "@chatify/types";
import { createId } from "@paralleldrive/cuid2";
import * as bcrypt from "bcrypt";

export const generateId = <TEntity extends Entities>(entity: TEntity) => {
	const cuid = createId();

	return `${entity}_${cuid}` satisfies Id<TEntity>;
};

export const hashProvider = {
	encrypt: async (value: string) => await bcrypt.hash(value, 10),
	compare: async (value: string, hash: string) =>
		await bcrypt.compare(value, hash),
};
