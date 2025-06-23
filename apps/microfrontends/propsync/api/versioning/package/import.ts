import { type Router, type Request, type Response } from 'express';
import { type KeystoneContext } from '@keystone-6/core/types';
import { initDB } from '../db';
import { type PackageFile, type VersionEntry, type Entity } from '../../../verzio/types';

export const importPackageRoute = (router: Router, context: KeystoneContext): void => {
  router.post(
    '/import',
    async (req: Request<unknown, unknown, PackageFile>, res: Response): Promise<void> => {
      try {
        const { entries } = req.body;

        if (!Array.isArray(entries)) {
          res.status(400).json({ error: 'Invalid package format: "entries" must be an array' });
          return;
        }

        const db = await initDB();

        if (!db.data || !Array.isArray(db.data.versions)) {
          res.status(500).json({ error: 'Database not initialized correctly' });
          return;
        }

        const existing = db.data.versions;

        const newEntries = entries.filter((entry: VersionEntry) => {
          return (
            entry &&
            entry.version &&
            entry.name &&
            entry.type &&
            entry.timestamp &&
            entry.data &&
            !existing.find(
              e =>
                e.name === entry.name &&
                e.type === entry.type &&
                e.version === entry.version &&
                e.timestamp === entry.timestamp
            )
          );
        });

        if (newEntries.length === 0) {
          res.status(409).json({ error: 'No new entries to import (all duplicates)' });
          return;
        }

        // Create any missing components before pushing versions
        for (const entry of newEntries) {
          if (entry.type === 'Page') {
            const pageData = entry.data as Entity;

            const connectedComponents = await Promise.all(
              (pageData.components || []).map(async (comp) => {
                try {
                  const found = await context.query.Component.findOne({
                    where: { customId: comp.customId },
                    query: 'customId',
                  });

                  if (found) return { customId: comp.customId };

                  const created = await context.query.component.createOne({
                    data: {
                      customId: comp.customId,
                      name: comp.name,
                      props: comp.props || {},
                    },
                    query: 'customId',
                  });

                  return { customId: created.customId };
                } catch (err) {
                  console.error('Error creating/finding component during import:', err);
                  return null;
                }
              })
            );

            const validComponents = connectedComponents.filter((c): c is { customId: string } => !!c);

            await context.query.page.createOne({
              data: {
                customId: pageData.customId,
                name: pageData.name,
                components: { connect: validComponents },
              },
              query: 'customId name',
            });
          }
        }

        db.data.versions.push(...newEntries);
        await db.write();

        res.status(200).json({ message: '✅ Import completed', imported: newEntries.length });
      } catch (err) {
        console.error('Error in /api/package/import:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
};
