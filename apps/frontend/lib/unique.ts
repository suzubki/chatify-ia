import { createId } from "@paralleldrive/cuid2";

export const generateId = () => {
	const uniqueId = createId();

	return uniqueId;
};
