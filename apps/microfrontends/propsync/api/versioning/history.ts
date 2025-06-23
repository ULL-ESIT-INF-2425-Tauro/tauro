import { getVersionsFor } from './service';
import { type Router, type Request, type Response } from 'express';

type HistoryQuery = {
  type?: 'Page' | 'Component';
  name?: string;
}

export const versionHistoryRoute = (router: Router): void => {
  router.get(
    '/history',
    async (
      req: Request<unknown, unknown, unknown, HistoryQuery>,
      res: Response
    ): Promise<void> => {
      try {
        const { type, name } = req.query;

        if (!type || !name) {
          res.status(400).json({ error: 'Both "type" and "name" are required' });
          return;
        }

        const versions = await getVersionsFor(name, type);
        res.status(200).json({ versions });
      } catch (err) {
        console.error('Error in /api/version/history:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
