import { Sequelize } from 'sequelize';
import { env } from './env.js';

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: 'postgres',
  logging: env.nodeEnv === 'development' ? console.log : false,
  pool: env.db.pool,
});

// Only connects. Tables are created beforehand from database/schema.sql
// (`npm run db:init` or the docker-compose init script); Sequelize never alters them.
export async function connectDatabase() {
  await sequelize.authenticate();

  const [[{ exists }]] = await sequelize.query(
    "SELECT to_regclass('public.users') IS NOT NULL AS exists",
  );
  if (!exists) {
    throw new Error('Table "users" not found. Run `npm run db:init` to apply database/schema.sql');
  }

  console.log('Database connection established');
}
