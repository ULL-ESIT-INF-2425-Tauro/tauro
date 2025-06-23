export type EntityType = 'Page' | 'Component';

export interface Entity {
  customId: string;
  name: string;
  type: EntityType;
  props?: Record<string, unknown>;
  components?: Entity[];
}

export interface VersionHistoryItem {
  version: string;
  timestamp: string;
  comment?: string;
  data?: Entity;
}

export interface VersionEntry {
  type: EntityType
  name: string
  version: string
  timestamp: string
  comment?: string
  data: Entity
}

export interface VersionDB {
  versions: VersionEntry[]
}

export interface PackageFile {
  exportedAt: string
  entries: VersionEntry[]
}
