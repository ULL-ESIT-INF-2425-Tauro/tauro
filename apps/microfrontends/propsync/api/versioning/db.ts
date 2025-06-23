import fs from 'fs'
import path from 'path'

type VersionEntry = {
  type: 'Page' | 'Component',
  name: string,
  version: string,
  timestamp: string,
  comment?: string
  data: unknown
}

type VersionDB = {
  versions: VersionEntry[]
}

const file = 'verzioDB/verzio.json'

const dir = path.dirname(file)
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

export async function initDB() {
  const { Low } = await import('lowdb')
  const { JSONFile } = await import('lowdb/node')

  const adapter = new JSONFile<VersionDB>(file)
  const db = new Low<VersionDB>(adapter, { versions: [] })

  await db.read()
  db.data ||= { versions: [] }
  await db.write()
  return db
}
