import { defineConfig } from "drizzle-kit";

const database_url = process.env.DATABASE_URL

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schema/*",
	casing: "snake_case",
  dbCredentials: {
    url: database_url
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
