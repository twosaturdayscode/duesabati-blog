import { z } from 'zod'

export const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1),
  NOTION_DATABASE_ID: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
