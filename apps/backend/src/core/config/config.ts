import { z } from "zod";

export const coreConfig = {
	env: z
		.enum(["development", "staging", "production"])
		.parse(process.env.NODE_ENV),
	database: {
		url: z.string().parse(process.env.DATABASE_URL),
	},
	port: z.number().default(4000).parse(process.env.PORT),
};
