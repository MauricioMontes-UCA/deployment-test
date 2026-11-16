-- Database schema: the single source of truth for the data model.
-- Run it once before starting the API (it is idempotent, safe to re-run).
-- Any ORM or driver (Sequelize, Prisma, TypeORM, raw pg...) maps onto these tables;
-- none of them is responsible for creating or altering them.
--
-- Requires PostgreSQL 13+ (gen_random_uuid() is built in).

CREATE TABLE IF NOT EXISTS users (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CONSTRAINT users_email_unique UNIQUE (email),
  CONSTRAINT users_email_lowercase CHECK (email = LOWER(email))
);
