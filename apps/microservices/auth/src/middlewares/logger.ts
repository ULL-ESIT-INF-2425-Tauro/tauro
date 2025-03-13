import { Context } from 'hono';
import { BlankEnv, Next } from 'hono/types';

export const loggerMiddleware = async function (c: Context<BlankEnv, never, object>, next: Next) {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
};
