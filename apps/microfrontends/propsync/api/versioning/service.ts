import { initDB } from './db'

export async function saveVersion(
  type: 'Page' | 'Component',
  name: string,
  data: unknown,
  comment?: string
) {
  const db = await initDB()
  const version = {
    type,
    name,
    version: `v${Date.now()}`,
    timestamp: new Date().toISOString(),
    comment,
    data,
  }
  db.data?.versions.push(version)
  await db.write()
  return version
}

export async function getVersionsFor(name: string, type: 'Page' | 'Component') {
  const db = await initDB()
  return db.data?.versions
    .filter((v: { name: string; type: string }) => v.name === name && v.type === type)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function restoreVersion(versionId: string) {
  const db = await initDB()
  const version = db.data?.versions.find((v: { version: string }) => v.version === versionId)
  return version?.data || null
}

export async function deleteVersion(versionId: string) {
  const db = await initDB()

  if (!db.data) {
    throw new Error('Database not initialized')
  }

  const originalLength = db.data.versions.length

  db.data.versions = db.data.versions.filter(
    (v: { version: string }) => v.version !== versionId
  )

  if (db.data.versions.length === originalLength) {
    throw new Error(`Version ${versionId} not found`)
  }

  await db.write()
  return { success: true, deleted: versionId }
}
