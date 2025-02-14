import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_KEY) {
  throw new Error('NEXT_PUBLIC_DRIZZLE_DATABASE_KEY is not defined');
}

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_KEY);
const db = drizzle(sql);

export { db }; 


