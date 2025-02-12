import type { Entities, Id } from "@chatify/types";
import { createId } from "@paralleldrive/cuid2";

export const generateId = <TEntity extends Entities>(entity: TEntity) => {
	const cuid = createId();

	return `${entity}_${cuid}` satisfies Id<TEntity>;
};
