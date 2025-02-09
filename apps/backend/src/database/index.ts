import "dotenv/config";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { coreConfig } from "src/core/config/config";
import * as schema from "./schema";

export const CONNECTION_TAGS = {
	DEV: "DATABASE_DEV",
	TEST: "DATABASE_TEST",
	PROD: "DATABASE_PROD",
} as const;

const constants = {
	connectionTags: {
		development: CONNECTION_TAGS.DEV,
		testing: CONNECTION_TAGS.TEST,
		production: CONNECTION_TAGS.PROD,
	},
	databaseUrl: coreConfig.database.url,
};

// development, testing, production
export const generateConfigBasedOnEnv = (env: string) => {
	const connectionTag =
		constants.connectionTags[env as keyof typeof constants.connectionTags];

	if (!constants.databaseUrl) {
		throw new Error("DATABASE_URL is not set");
	}

	return {
		connectionTag,
		databaseUrl: constants.databaseUrl,
	};
};

export const dbConfig = generateConfigBasedOnEnv(
	coreConfig.env ?? "development",
);

export type DatabaseInjector = PostgresJsDatabase<typeof schema>;
