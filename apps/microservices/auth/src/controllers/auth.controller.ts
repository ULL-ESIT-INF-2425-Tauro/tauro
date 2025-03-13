import { Context } from 'hono';
import { BlankEnv, BlankInput } from 'hono/types';

import { auth } from '@/lib/auth.ts';

export const authController = async (c: Context<BlankEnv, '/**', BlankInput>) => {
  return auth.handler(c.req.raw);
};
