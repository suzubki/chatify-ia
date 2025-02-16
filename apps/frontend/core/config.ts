import { z } from "zod";

export const coreConfig = {
	environment: z
		.enum(["development", "testing", "production"])
		.default("development")
		.parse(process.env.NODE_ENV),

	server: {
		chatify: {
			urls: {
				production: "https://api.example.com",
				testing: "https://api.example.com",
				development: "http://localhost:4000",
			},
			prefixes: {
				api: "/api/v1",
			},
		},
	},
} as const;
