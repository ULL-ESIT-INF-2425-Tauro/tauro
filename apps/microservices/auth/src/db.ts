import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { ENVCONFIG } from '@/config.ts';
import * as authSchema from '@/schemas/auth-schema.ts';

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = ENVCONFIG;

// PostgreSQL connection configuration
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// Initialize Drizzle ORM
export const db = drizzle(pool, { schema: authSchema });

export async function checkDBConnection() {
  try {
    await pool.connect();
    console.log('Connected to the database 🚀🌐');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);
      console.error('Error details:', error);
    } else {
      console.error('Unknown error:', error);
    }
  }
}
