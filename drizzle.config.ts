import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || "psql 'postgresql://neondb_owner:npg_28jXZGtQahbl@ep-silent-rain-a1btpdlv-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'",
  },
});
