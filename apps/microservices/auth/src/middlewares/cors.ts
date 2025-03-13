import { cors } from 'hono/cors';

import { ENVCONFIG } from '@/config.ts';

const ORIGIN_CORS = ENVCONFIG.ORIGIN_CORS;

export const corsMiddleware = function () {
  return cors({
    origin: ORIGIN_CORS,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  });
};
