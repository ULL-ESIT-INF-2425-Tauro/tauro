import { type KeystoneContext } from '@keystone-6/core/types';
import { type Application, type Request, type Response } from 'express';

export const entitiesRoute = (app: Application, context: KeystoneContext): void => {
  app.get('/api/entities', async (_req: Request, res: Response): Promise<void> => {
    try {
      const pages = await context.query.Page.findMany({
        query: `
          customId
          name
          components {
            customId
            name
            props
          }
        `,
      });

      const typedPages = pages as {
        customId: string;
        name: string;
        components?: {
          customId: string;
          name: string;
          props: Record<string, unknown>;
        }[];
      }[];

      const result = typedPages.map(page => ({
        customId: page.customId,
        name: page.name,
        type: 'Page' as const,
        components: (page.components || []).map(comp => ({
          customId: comp.customId,
          name: comp.name,
          type: 'Component' as const,
          props: comp.props,
        })),
      }));

      res.status(200).json({ pages: result });
    } catch (err) {
      console.error('Error in /api/entities:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
