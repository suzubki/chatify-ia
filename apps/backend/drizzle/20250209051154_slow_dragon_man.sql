CREATE TABLE "chat" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedBy" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"deletedAt" timestamp,
	"deletedBy" text
);
--> statement-breakpoint
CREATE TABLE "prompts" (
	"id" text PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"aiAgent" text DEFAULT 'gpt4' NOT NULL,
	"userId" text NOT NULL,
	"chatId" text NOT NULL,
	"metadata" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedBy" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"deletedAt" timestamp,
	"deletedBy" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"_passwordHash" text NOT NULL,
	"_passwordReset" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedBy" text,
	"deleted" boolean DEFAULT false NOT NULL,
	"deletedAt" timestamp,
	"deletedBy" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_updatedBy_users_id_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_deletedBy_users_id_fk" FOREIGN KEY ("deletedBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_index" ON "users" USING btree ("email");