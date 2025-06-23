import { type KeystoneContext } from '@keystone-6/core/types';
import { type Router, type Request, type Response } from 'express';

type CreatePageBody = {
  customId: string,
  name: string;
  components?: string[];
}

export const pageCreateRoute = (router: Router, context: KeystoneContext): void => {
  router.post(
    '/create',
    async (
      req: Request<unknown, unknown, CreatePageBody>,
      res: Response
    ): Promise<void> => {
      const { customId, name, components = [] } = req.body;

      if (!name) {
        res.status(400).json({ error: '"name" is required' });
        return;
      }

      try {
        const page = await context.query.Page.createOne({
          data: {
            customId,
            name,
            components: {
              connect: components.map(customId => ({ customId })),
            },
          },
          query: 'customId name',
        });

        res.status(200).json({ page });
      } catch (err) {
        console.error('Error in /api/page/create:', err);
        res.status(500).json({ error: 'Failed to create page' });
      }
    }
  );
};
