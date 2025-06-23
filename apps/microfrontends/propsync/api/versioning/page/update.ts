import { type KeystoneContext } from '@keystone-6/core/types';
import { Router, type Request, type Response } from 'express';

interface UpdatePageBody {
  customId: string;
  data: {
    name: string;
    components?: {
      customId: string;
      name: string;
      type: 'Component';
      props?: Record<string, unknown>;
    }[];
  };
}

export const pageUpdateRoute = (router: Router, context: KeystoneContext): void => {
  router.post(
    '/update',
    async (req: Request<unknown, unknown, UpdatePageBody>, res: Response): Promise<void> => {
      try {
        const { customId, data } = req.body;

        if (!customId || !data || !data.name) {
          res.status(400).json({ error: 'Missing required page id or data' });
          return;
        }

        let connectedComponents: { customId: string }[] | undefined;

        if (data.components && data.components.length > 0) {
          const requestedIds = data.components.map((c) => c.customId);

          // Get existing components
          const existing = await context.query.Component.findMany({
            where: { customId: { in: requestedIds } },
            query: 'customId',
          });
          const existingIds = new Set(existing.map((c) => c.customId));

          const toCreate = data.components.filter((c) => !existingIds.has(c.customId));

          // Create missing components
          for (const comp of toCreate) {
            await context.query.Component.createOne({
              data: {
                customId: comp.customId,
                name: comp.name,
                props: comp.props || {},
              },
              query: 'customId',
            });
          }


          connectedComponents = data.components.map((c) => ({ customId: c.customId }));
        }

        // Update the page
        const updated = await context.query.Page.updateOne({
          where: { customId },
          data: {
            name: data.name,
            components: connectedComponents ? { set: connectedComponents } : undefined,
          },
          query: 'customId name components { customId name }',
        });

        res.status(200).json({ updated });
      } catch (err) {
        console.error('Error in /page/update:', err);
        res.status(500).json({ error: 'Failed to update page' });
      }
    }
  );
};
