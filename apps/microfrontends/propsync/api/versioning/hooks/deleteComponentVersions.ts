import { initDB } from '../db';

export async function deleteComponentVersions(customId: string) {
  const db = await initDB();

  if (!db.data || !Array.isArray(db.data.versions)) return;

  db.data.versions = db.data.versions.filter((v) => {
    if (v.type !== 'Component') return true;
    const data = v.data as { customId?: string };
    return data?.customId !== customId;
  });

  await db.write();
}
