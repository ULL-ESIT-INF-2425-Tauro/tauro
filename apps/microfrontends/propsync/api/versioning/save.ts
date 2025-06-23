import { saveVersion } from './service';
import { type Request, type Response, type Router } from 'express';

type EntityType = 'Component' | 'Page';

type SaveVersionBody = {
  type: EntityType;
  name: string;
  data: unknown;
  comment?: string;
}

export const versionSaveRoute = (router: Router) => {
  router.post(
    '/save',
    async (
      req: Request<unknown, unknown, SaveVersionBody>,
      res: Response
    ): Promise<void> => {
      try {
        const { type, name, data, comment } = req.body;

        if (!type || !name || !data) {
          res.status(400).json({ error: 'Missing required fields: type, name or data' });
          return;
        }

        const version = await saveVersion(type, name, data, comment);
        res.status(200).json({ success: true, version });
      } catch (err) {
        console.error('Error in /api/version/save:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};

