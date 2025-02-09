import { defineConfig } from "drizzle-kit";
import { dbConfig } from "src/database";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schema/*",
	dbCredentials: {
		url: dbConfig.databaseUrl,
	},

	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
		schema: "public",
	},

	breakpoints: true,
	strict: true,
	verbose: true,
});
