import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schema/*",
	casing: "snake_case",
  dbCredentials: {
    url: databaseUrl
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
