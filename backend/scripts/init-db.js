// Applies database/schema.sql using the plain `pg` driver (no ORM involved).
// Usage: npm run db:init
import { readFile } from 'node:fs/promises';
import pg from 'pg';
import { env } from '../src/config/env.js';

const schemaPath = new URL('../database/schema.sql', import.meta.url);

const client = new pg.Client({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
});

try {
  const sql = await readFile(schemaPath, 'utf8');
  await client.connect();
  await client.query(sql);
  console.log('Schema applied successfully');
} catch (error) {
  console.error('Failed to apply schema:', error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
