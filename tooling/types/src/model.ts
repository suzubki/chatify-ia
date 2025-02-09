export type Only<TEntity extends { $relations: any }> = Omit<
	TEntity,
	"$relations"
>;

export type Entities = "user" | "chat" | "prompt";

// ---------------- Utility interfaces & types ----------------
export interface Creatable {
	createdAt: Date;
	createdBy: UserId;
}

export interface Updeatable {
	updatedAt: Date;
	updatedBy: UserId;
}

export interface Deletable {
	deleted: boolean;
	deletedAt: Date | null;
	deletedBy: UserId | null;
}

// ---------------- Entites interfaces & types ----------------
export interface User
	extends Creatable,
		Updeatable,
		Deletable,
		ResetablePassword {
	id: string;
	name: string;
	email: string;

	// Relations one to many
	$relations: {
		chats: Chat[];
		prompts: Prompt[];
	};
}

export interface ResetablePassword {
	_passwordHash: string;
	_passwordReset: {
		_prevPasswordHash: string;
		code: string;
		requestedAt: Date;
		expiresAt: Date;
	} | null;
}

/**
 * Chat entity. It represents a chat created by an user and store prompts.
 * The chat links our user and some AI agent to generate responses.
 */
export interface Chat extends Creatable, Updeatable, Deletable {
	id: string;
	userId: UserId;
	title: string;

	// Relations one to many
	$relations: {
		user: User;
		prompts: Prompt[];
	};
}

/**
 * Prompt entity. It represents a message that the AI agent will use to generate a response.
 * Since every aiAgent has its own metadata, we store it as a JSON object.
 */
export interface Prompt extends Creatable, Updeatable, Deletable {
	id: string;
	message: string;
	aiAgent: AiAgent;

	userId: UserId;
	chatId: ChatId;

	metadata: Record<string, any>;

	$relations: {
		user: User;
		chat: Chat;
	};
}

export type Id<T extends Entities> = `${T}_${string}`;

export type UserId = Id<"user">;
export type ChatId = Chat["id"];

export type AiAgent = "gpt4" | "claude";
