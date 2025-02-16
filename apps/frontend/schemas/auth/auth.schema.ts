import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "../base.schema";

export const registerUserSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
});

export const loginUserSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type LoginUserPayload = z.infer<typeof loginUserSchema>;
export type RegisterUserPayload = z.infer<typeof registerUserSchema>;
