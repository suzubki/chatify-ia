import * as t from "drizzle-orm/pg-core";
import { id } from "./base";

export const users = t.pgTable(
	"users",
	{
		id: id<"user">("id"),
		name: t.text().notNull(),
		email: t.text().notNull().unique(),
		_passwordHash: t.text().notNull(),
		_passwordReset: t.jsonb().$type<{
			_passwordHash: string;
			_passwordReset: { code: string; requestedAt: Date; expiresAt: Date };
		}>(),

		createdAt: t.timestamp().notNull().defaultNow(),
		createdBy: t.text().notNull(),
		updatedAt: t.timestamp().notNull().defaultNow(),
		updatedBy: t
			.text()
			.notNull()
			.references(() => users.id),

		deleted: t.boolean().notNull().default(false),
		deletedAt: t.timestamp(),
		deletedBy: t.text().references(() => users.id),
	},
	(table) => [t.uniqueIndex("email_idx").on(table.email)],
);

export const chats = t.pgTable("chat", {
	id: id<"chat">("id"),
	title: t.text().notNull().default(""), // default empty string or generated from the first prompt

	// relations
	userId: t
		.text()
		.notNull()
		.references(() => users.id),
	prompts: t
		.text()
		.array()
		.references(() => prompts.id),

	// timestamps
	createdAt: t.timestamp().notNull().defaultNow(),
	createdBy: t
		.text()
		.notNull()
		.references(() => users.id),

	updatedAt: t.timestamp().notNull().defaultNow(),
	updatedBy: t
		.text()
		.notNull()
		.references(() => users.id),

	deleted: t.boolean().notNull().default(false),
	deletedAt: t.timestamp(),
	deletedBy: t.text().references(() => users.id),
});

export const prompts = t.pgTable("prompts", {
	id: id<"prompt">("id"),
	message: t.text().notNull(), // we are not allowing empty messages
	aiAgent: t.text().notNull().default("gpt4"), // default gpt4, should pass an enum here

	// relations
	userId: t
		.text()
		.notNull()
		.references(() => users.id),
	chatId: t
		.text()
		.notNull()
		.references(() => chats.id),

	// extra metadata
	metadta: t.jsonb(),

	// timestamps
	createdAt: t.timestamp().notNull().defaultNow(),
	createdBy: t
		.text()
		.notNull()
		.references(() => users.id),

	updatedAt: t.timestamp().notNull().defaultNow(),
	updatedBy: t
		.text()
		.notNull()
		.references(() => users.id),

	deleted: t.boolean().notNull().default(false),
	deletedAt: t.timestamp(),
	deletedBy: t.text().references(() => users.id),
});
