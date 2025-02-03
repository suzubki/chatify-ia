import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL

export const makeDatabase = () => {
  const queryClient = postgres(databaseUrl)
  
  const db = drizzle(queryClient, { schema, logger: true })

  return db
}