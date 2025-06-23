import { config } from '@keystone-6/core'
import { lists } from './schema'
import { withAuth, session } from './auth'

import express from 'express'
import path from 'path'
import fs from 'fs'

import { type KeystoneContext } from '@keystone-6/core/types';
import { type Express } from 'express';

import { entitiesRoute } from './api/versioning/entities'
import { versionSaveRoute } from './api/versioning/save'
import { versionHistoryRoute } from './api/versioning/history'
import { versionRestoreRoute } from './api/versioning/restore'
import { componentUpdateRoute } from './api/versioning/component/update'
import { versionDeleteRoute } from './api/versioning/delete'
import { importPackageRoute } from './api/versioning/package/import'
import { pageUpdateRoute } from './api/versioning/page/update'

import dotenv from 'dotenv';
dotenv.config();

function getAllFiles(dirPath: string, basePath = dirPath): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  const files = entries.flatMap(entry => {
    const fullPath = path.join(dirPath, entry.name)
    return entry.isDirectory()
      ? getAllFiles(fullPath, basePath)
      : [path.relative(basePath, fullPath)]
  })

  return files
}

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL || ''
    },
    lists,
    ui: {
      isAccessAllowed: ({ session }) => !!session?.data,
      publicPages: ['/verzio', "/verzio-navs"],
      getAdditionalFiles: [
        async () => {
          const verzioDir = path.join(process.cwd(), 'verzio')
          const files = getAllFiles(verzioDir)

          return files.map(file => ({
            mode: 'copy',
            inputPath: path.join(verzioDir, file),
            outputPath: path.join('pages/verzio', file),
          }))
        }
      ],
    },
    session,
    server: {
      cors: { origin: [process.env.ORIGIN_CORS || ''], credentials: true },
      extendExpressApp: (app: Express, context: KeystoneContext) => {
        const versionRouter = express.Router();
        versionRouter.use(express.json());

        versionSaveRoute(versionRouter)
        versionHistoryRoute(versionRouter)
        versionRestoreRoute(versionRouter)
        versionDeleteRoute(versionRouter)

        app.use('/api/version', versionRouter)

        entitiesRoute(app, context)

        const componentRouter = express.Router();
        componentRouter.use(express.json());
        componentUpdateRoute(componentRouter, context);
        app.use('/api/component', componentRouter);

        const pageRouter = express.Router();
        pageRouter.use(express.json());
        pageUpdateRoute(pageRouter, context);
        app.use('/api/page', pageRouter);

        const packageRouter = express.Router();
        packageRouter.use(express.json());
        importPackageRoute(packageRouter, context);
        app.use('/api/package', packageRouter);
      },
      port: Number(process.env.PORT ?? '3002'),
    }
  })
)
