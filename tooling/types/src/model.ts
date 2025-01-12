interface Creatable {
	createdAt: Date;
	createdBy: UserId;
}

interface Updeatable {
	updatedAt: Date;
	updatedBy: UserId;
}

interface Deletable {
	deleted: boolean;

	deletedAt: Date | null;
	deletedBy: UserId | null;
}

export interface Prompt extends Creatable, Updeatable, Deletable {
	id: string;
	message: string;
	aiAgent: AiAgent;
}

export interface User extends Creatable, Updeatable, Deletable {
	id: string;
	name: string;
	email: string;
	phone: string;

	// One-to-many relationship
	prompts: Prompt[];
}

export type UserId = User["id"];

export type AiAgent = "gpt4" | "claude";
