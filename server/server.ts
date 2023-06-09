import type { AppLoadContext } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
import { envSchema } from 'server/env'

import { NotionService } from '@/notion/notion'

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(context): AppLoadContext {
    const env: AppLoadContext['env'] = envSchema.parse(context.env)

    const services: AppLoadContext['services'] = {
      notion: new NotionService({
        auth: env.NOTION_API_KEY,
        database_id: env.NOTION_DATABASE_ID,
        kv: context.env['notion_cache'],
        r2: context.env['images_cache'],
      }),
    }

    return { env, services }
  },
})

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context)
}
