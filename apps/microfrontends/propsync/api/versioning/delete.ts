import { deleteVersion } from './service';
import { type Router, type Request, type Response } from 'express';

type DeleteVersionQuery = {
  versionId?: string;
}

export const versionDeleteRoute = (router: Router): void => {
  router.delete(
    '/delete',
    async (
      req: Request<unknown, unknown, unknown, DeleteVersionQuery>,
      res: Response
    ): Promise<void> => {
      try {
        const { versionId } = req.query;

        if (!versionId) {
          res.status(400).json({ error: '"versionId" is required' });
          return;
        }

        const data = await deleteVersion(versionId);

        if (!data) {
          res.status(404).json({ error: 'Version not found' });
          return;
        }

        res.status(200).json({ data });
      } catch (err) {
        console.error('Error in /api/version/delete:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
