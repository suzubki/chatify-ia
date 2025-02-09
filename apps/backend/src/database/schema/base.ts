import type { Entities, Id } from "@chatify/types";
import { text } from "drizzle-orm/pg-core";

export const id = <TEntity extends Entities>(name: string) =>
	text(name).primaryKey().notNull().$type<Id<TEntity>>();
