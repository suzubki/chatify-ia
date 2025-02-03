import * as t from "drizzle-orm/pg-core";
import { baseTimestamps } from "../columns.helper";

export const users = t.pgTable(
  "users", 
  {
    id: t.text().primaryKey().notNull(),
    email: t.text().notNull().unique(),
    password: t.text().notNull(),

    ...baseTimestamps
  },
  (table) => {
    return {
      emailIndex: t.uniqueIndex("email_idx").on(table.email)
    }
  }
)