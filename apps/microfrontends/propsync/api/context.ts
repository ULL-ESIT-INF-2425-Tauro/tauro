import { getContext } from '@keystone-6/core/context'
import config from '../keystone'
import * as PrismaModule from '@prisma/client'

export const context = getContext(config, PrismaModule)