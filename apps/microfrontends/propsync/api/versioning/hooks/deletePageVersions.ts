import { initDB } from '../db';

export async function deletePageVersions(customId: string) {
  const db = await initDB();

  if (!db.data || !Array.isArray(db.data.versions)) return;

  db.data.versions = db.data.versions.filter(
    (v) => !(v.type === 'Page' && v.data.customId === customId)
  );

  await db.write();
}
