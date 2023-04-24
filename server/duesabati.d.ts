import type { Env } from 'server/env'
import type { NotionService } from 'services/notion/notion'

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    env: Env
    services: {
      notion: NotionService
    }
  }
}
