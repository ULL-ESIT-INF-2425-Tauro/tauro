import { Hono } from 'hono';

import { checkDBConnection } from './db.ts';
import { corsMiddleware } from './middlewares/cors.ts';
import { loggerMiddleware } from './middlewares/logger.ts';
import authRoutes from './routes/auth.routes.ts';

const app = new Hono();

checkDBConnection();

// Middlewares
app.use(loggerMiddleware);
app.use('/api/auth/**', corsMiddleware());

// Routes
app.route('/api/auth', authRoutes);

export default app;
