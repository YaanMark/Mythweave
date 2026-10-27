# Drizzle configuration
import { defineConfig } from 'drizzle-kit';
import * as schema from './src/db/schema';

export default defineConfig({
  schema,
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
});
