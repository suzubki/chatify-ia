import type { Entities } from "@chatify/types";
import { text } from "drizzle-orm/pg-core";

export type Id<T extends Entities> = `${T}_${string}`;

export const id = <TEntity extends Entities>(name: string) =>
	text(name).primaryKey().notNull().$type<Id<TEntity>>();
