import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, sequelize } from './config/database.js';

async function start() {
  try {
    await connectDatabase();
    const server = app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
    });

    const shutdown = async () => {
      server.close();
      await sequelize.close();
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
