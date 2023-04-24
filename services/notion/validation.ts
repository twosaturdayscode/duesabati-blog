import type {
  FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

import type { Result } from 'pratica'
import { encaseRes, Ok } from 'pratica'
import { z } from 'zod'

const titleSchema = z.string().min(1)

function validateTitleProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (!props['title'] || props['title'].type !== 'rich_text')
      throw new Error('Type of title is not of type rich_text')

    titleSchema.parse(props['title'].rich_text.map(p => p.plain_text).join(' '))

    return props
  })
}

const descriptionSchema = z.string().min(1)

function validateDescriptionProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (!props['description'] || props['description'].type !== 'rich_text')
      throw new Error('Type of description is not of type rich_text')

    descriptionSchema.parse(
      props['description'].rich_text.map(p => p.plain_text).join(' ')
    )

    return props
  })
}

const tagsSchema = z.array(z.object({ name: z.string() })).min(1)

function validateTagsProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (!props['tags'] || props['tags'].type !== 'multi_select')
      throw new Error('Type of tags is not of type multi_select')

    tagsSchema.parse(props['tags'].multi_select)

    return props
  })
}

const statusSchema = z.object({
  name: z.union([z.literal('draft'), z.literal('published')]),
})

function validateStatusProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (!props['status'] || props['status'].type !== 'select')
      throw new Error('Type of status is not of select')

    statusSchema.parse(props['status'].select)

    return props
  })
}

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(-?[a-z0-9]+)*$/)

function validateSlugProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (
      !props['slug'] ||
      props['slug'].type !== 'formula' ||
      props['slug'].formula.type !== 'string'
    )
      throw new Error('Type of slug is not of string')

    slugSchema.parse(props['slug'].formula.string)

    return props
  })
}

/** 10 is the length of a date string in the format 2023-01-01 (the one of notion) */
const publishedAtDateStringSchema = z.string().min(10)

function validatePublishedAtProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (!props['published-at'] || props['published-at'].type !== 'date')
      throw new Error('Type of published-at is not of date')

    publishedAtDateStringSchema.parse(props['published-at'].date?.start)

    return props
  })
}

const imageUrlSchema = z.string().min(1)

function validateImageProp(props: PageObjectResponse['properties']) {
  return encaseRes(() => {
    if (
      !props['image'] ||
      props['image'].type !== 'files' ||
      !props['image'].files ||
      props['image'].files[0].type !== 'file'
    )
      throw new Error('Type of image is not of files')

    imageUrlSchema.parse(props['image'].files[0].file.url)

    return props
  })
}

export type PageWithValidProperties = {
  title: {
    id: string
    type: 'rich_text'
    rich_text: TextRichTextItemResponse[]
  }
  description: {
    id: string
    type: 'rich_text'
    rich_text: TextRichTextItemResponse[]
  }
  tags: {
    id: string
    type: 'multi_select'
    multi_select: MultiSelectPropertyItemObjectResponse['multi_select']
  }
  slug: {
    id: string
    type: 'formula'
    formula: {
      type: 'string'
      string: string
    }
  }
  status: {
    id: string
    type: 'select'
    select: { name: 'published' | 'draft '; id: string; color: string }
  }
  'published-at': {
    id: string
    type: 'date'
    date: { start: string }
  }
  image: {
    id: string
    type: 'file'
    files: { file: { url: string } }[]
  }
}

export function validatePageProperties(
  pageProps: PageObjectResponse['properties']
) {
  return Ok(pageProps)
    .chain(validateTitleProp)
    .chain(validateDescriptionProp)
    .chain(validateSlugProp)
    .chain(validateTagsProp)
    .chain(validateStatusProp)
    .chain(validateImageProp)
    .chain(validatePublishedAtProp) as unknown as Result<
    PageWithValidProperties,
    Error
  >
}
