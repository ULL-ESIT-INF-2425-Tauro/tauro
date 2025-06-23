import { type KeystoneContext } from '@keystone-6/core/types';
import { type Router, type Request, type Response } from 'express';

type ComponentUpdateBody = {
  customId: string;
  props: Record<string, unknown>;
}

export const componentUpdateRoute = (router: Router, context: KeystoneContext): void => {
  router.post(
    '/update',
    async (
      req: Request<unknown, unknown, ComponentUpdateBody>,
      res: Response
    ): Promise<void> => {
      try {
        const { customId, props } = req.body;

        if (!customId || !props || typeof props !== 'object') {
          res.status(400).json({ error: 'Missing or invalid "id" or "props"' });
          return;
        }

        const updated = await context.query.Component.updateOne({
          where: { customId },
          data: { props },
          query: 'customId name props',
        });

        res.status(200).json({ updated });
      } catch (err) {
        console.error('Error in /api/component/update:', err);
        res.status(500).json({ error: 'Failed to update component' });
      }
    }
  );
};
