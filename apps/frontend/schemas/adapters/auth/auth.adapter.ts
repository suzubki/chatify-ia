import { emailSchema, nameSchema, userIdSchema } from "@/schemas/base.schema";
import { z } from "zod";

export const authenticatedUserAdapterSchema = z.object({
	email: emailSchema,
	id: userIdSchema,
	name: nameSchema,
});

export type AuthenticatedUserAdapter = z.infer<
	typeof authenticatedUserAdapterSchema
>;
