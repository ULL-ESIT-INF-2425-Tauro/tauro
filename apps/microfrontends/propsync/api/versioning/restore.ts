import { restoreVersion } from './service';
import { type Router, type Request, type Response } from 'express';

type RestoreQuery = {
  versionId?: string;
}

export const versionRestoreRoute = (router: Router): void => {
  router.get(
    '/restore',
    async (
      req: Request<unknown, unknown, unknown, RestoreQuery>,
      res: Response
    ): Promise<void> => {
      try {
        const { versionId } = req.query;

        if (!versionId) {
          res.status(400).json({ error: 'versionId is required' });
          return;
        }

        const data = await restoreVersion(versionId);

        if (!data) {
          res.status(404).json({ error: 'Version not found' });
          return;
        }

        res.status(200).json({ data });
      } catch (err) {
        console.error('Error in /api/version/restore:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
