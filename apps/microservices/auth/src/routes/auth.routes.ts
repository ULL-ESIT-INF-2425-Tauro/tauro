import { Hono } from 'hono';

import { authController } from '@/controllers/auth.controller.ts';

const app = new Hono();

app.on(['POST', 'GET'], '/**', authController);

export default app;
