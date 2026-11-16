import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    // With credentials the origin must be explicit; "*" is rejected by browsers.
    origin: env.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);
