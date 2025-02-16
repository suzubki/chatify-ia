import { z } from "zod";

// ------------ User common fields schema ----------------
export const userIdSchema = z.string();

export const nameSchema = z.string().min(3).max(255);

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
	.string()
	.min(8, "Password must be between 8 and 32 characters")
	.max(32, "Password must be between 8 and 32 characters");
