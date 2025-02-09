import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { type Id, id } from "./base";

export const users = t.pgTable(
	"users",
	{
		id: id<"user">("id"),
		name: t.text().notNull(),
		email: t.text().notNull().unique(),
		_passwordHash: t.text().notNull(),
		_passwordReset: t.jsonb().$type<{
			_prevPasswordHash: string;
			code: string;
			requestedAt: Date;
			expiresAt: Date;
		}>(),

		// timestamps
		createdAt: t.timestamp().notNull().defaultNow(),
		createdBy: t.text().notNull().$type<Id<"user">>(),
		updatedAt: t.timestamp().notNull().defaultNow(),
		updatedBy: t.text().notNull().$type<Id<"user">>(),

		deleted: t.boolean().notNull().default(false),
		deletedAt: t.timestamp(),
		deletedBy: t.text().$type<Id<"user">>(),
	},
	(table) => [t.index("email_index").on(table.email)],
);

export const usersRelations = relations(users, ({ many }) => {
	return {
		chats: many(chats),
		prompts: many(prompts),
	};
});

export const chats = t.pgTable("chat", {
	id: id<"chat">("id"),
	title: t.text().notNull().default(""), // default empty string or generated from the first prompt

	// relations
	userId: t.text().notNull().$type<Id<"user">>(),

	// timestamps
	createdAt: t.timestamp().notNull().defaultNow(),
	createdBy: t.text().notNull().$type<Id<"user">>(),

	updatedAt: t.timestamp().notNull().defaultNow(),
	updatedBy: t.text().notNull().$type<Id<"user">>(),

	deleted: t.boolean().notNull().default(false),
	deletedAt: t.timestamp(),
	deletedBy: t.text().$type<Id<"user">>(),
});

export const chatsRelations = relations(chats, ({ many, one }) => {
	return {
		user: one(users, {
			fields: [chats.userId],
			references: [users.id],
		}),
		prompts: many(prompts),
	};
});

export const prompts = t.pgTable("prompts", {
	id: id<"prompt">("id"),
	message: t.text().notNull(), // we are not allowing empty messages
	aiAgent: t.text().notNull().default("gpt4"), // default gpt4, should pass an enum here

	// relations
	userId: t.text().notNull().$type<Id<"user">>(),
	chatId: t.text().notNull().$type<Id<"chat">>(),

	// extra metadata
	metadata: t.jsonb(),

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

export const promptsRelations = relations(prompts, ({ one }) => {
	return {
		user: one(users, {
			fields: [prompts.userId],
			references: [users.id],
		}),
		chat: one(chats, {
			fields: [prompts.chatId],
			references: [chats.id],
		}),
	};
});
