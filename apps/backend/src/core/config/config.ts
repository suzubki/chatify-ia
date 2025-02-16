import { z } from "zod";

const makeWebUrls = (environment: string): string => {
	return urls.web[environment];
};

const makeApiUrls = (environment: string): string => {
	return urls.api[environment];
};

const urls = {
	web: {
		production: "https://www.chatify.com",
		staging: "https://staging.chatify.com",
		development: "http://localhost:3000",
	},
	api: {
		production: "https://api.chatify.com",
		staging: "https://staging.api.chatify.com",
		development: "http://localhost:4000",
	},
};

const environment = z
	.enum(["development", "staging", "production"])
	.parse(process.env.NODE_ENV);

export const coreConfig = {
	env: environment,
	database: {
		url: z.string().min(12).parse(process.env.DATABASE_URL),
	},
	port: z.number().default(4000).parse(process.env.PORT),
	jwtSecret: z.string().min(8).parse(process.env.JWT_SECRET),

	webUrl: makeWebUrls(environment),
	apiUrl: makeApiUrls(environment),
	tokens: {
		duration: {
			accessToken: {
				seconds: (60 * 60 * 1) / 4, // 15 min
				miliSeconds: 60 * 60 * 1000,
			},
			refreshToken: {
				seconds: 60 * 60 * 24 * 7, // 7 days
				miliSeconds: 1000 * 60 * 60 * 24 * 7,
			},
		},
	},
};
