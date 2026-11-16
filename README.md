# My Login

User authentication system (register / sign in / sign out) with JWT stored in an httpOnly cookie.

```
my-login/
├── backend/             Node.js + Express + Sequelize (PostgreSQL) + JWT
│   └── database/
│       └── schema.sql   Source of truth for the data model
├── frontend/            React + Vite + Axios
└── docker-compose.yml   Local PostgreSQL (applies schema.sql on first start)
```

## Quick start

```bash
# 1. Database (schema.sql runs automatically the first time the volume is created)
docker compose up -d

# 2. Backend (http://localhost:3000)
cd backend
cp .env.example .env   # set JWT_SECRET
npm install
npm run db:init        # only needed if the DB was not created by docker compose
npm run dev

# 3. Frontend (http://localhost:5173)
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

## Deployment convention: schema first, then connect

The database is created **before** the application runs, from plain SQL:

1. `backend/database/schema.sql` defines every table, constraint and default.
2. It is applied once with any tool: `npm run db:init`, `psql -f`, a GUI client,
   or the Docker init directory. The script is idempotent.
3. The API only **connects**. It never creates or alters tables, and at startup
   it refuses to run if the expected tables are missing.

This keeps the schema independent of the ORM or driver. Whether a project uses
Sequelize, Prisma, TypeORM, Knex or raw queries, it maps onto the same tables, and
the same `schema.sql` can be reviewed, versioned and applied the same way.

## Backend architecture (N-layer)

```
request → routes → middlewares → controllers → services → repositories → models (Sequelize) → PostgreSQL
```

| Layer | Folder | Responsibility |
|---|---|---|
| Middleware | `src/middlewares` | Input validation (express-validator), JWT cookie verification, error handling |
| Controller | `src/controllers` | Read the HTTP request, call a service, set the cookie and send the response |
| Service | `src/services` | Business rules (hashing, credential checks, token issuing) |
| Repository | `src/repositories` | Data access; the only layer that uses the ORM |
| Model | `src/models` | Sequelize mappings of the existing tables |

The Sequelize connection pool is configured in `src/config/database.js` via the `DB_POOL_*` variables.

## Session and CORS

- On register/login the API sets an `access_token` cookie (`HttpOnly`, `SameSite`, `Secure`
  when configured) whose expiration matches the JWT. The token is never in the response body
  and is not readable from JavaScript.
- CORS allows only `CORS_ORIGIN` with `credentials: true`. The frontend sends the cookie via
  Axios `withCredentials: true`.
- Same site (e.g. `localhost:5173` → `localhost:3000`): `COOKIE_SAME_SITE=lax`.
- Different domains: `COOKIE_SAME_SITE=none` (forces `Secure`, so the API must be served over HTTPS).

## API

| Method | Endpoint | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/api/auth/register` | — | `{ name, email, password }` | `201 { user }` + cookie |
| POST | `/api/auth/login` | — | `{ email, password }` | `200 { user }` + cookie |
| POST | `/api/auth/logout` | — | — | `204`, clears cookie |
| GET | `/api/auth/me` | cookie | — | `200 { user }` |
| GET | `/api/health` | — | — | `200 { status }` |

Validation errors return `400 { message, errors: { field: message } }`.
