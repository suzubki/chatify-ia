import { timestamp } from "drizzle-orm/pg-core";

export const baseTimestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull()
}
