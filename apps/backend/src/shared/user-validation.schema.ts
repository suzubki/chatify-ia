import { z } from "zod";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(255);

export const createUserSchema = z.object({
	name: z.string().min(3).max(255),
	email: emailSchema,
	password: passwordSchema,
});

export const loginUserSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
