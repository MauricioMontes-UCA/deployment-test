import 'dotenv/config';

const required = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET', 'CORS_ORIGIN'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const sameSite = (process.env.COOKIE_SAME_SITE || 'lax').toLowerCase();
if (!['lax', 'strict', 'none'].includes(sameSite)) {
  throw new Error('COOKIE_SAME_SITE must be one of: lax, strict, none');
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 10,
      min: Number(process.env.DB_POOL_MIN) || 0,
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: Number(process.env.DB_POOL_IDLE) || 10000,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  cookie: {
    name: 'access_token',
    sameSite,
    // Browsers reject SameSite=None cookies that are not Secure.
    secure: sameSite === 'none' || process.env.COOKIE_SECURE === 'true',
  },
};
