import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    cluster: z.enum([
      'villa-design',
      'tropical-architecture',
      'construction',
      'renovation',
      'materials',
      'permits-planning',
      'sustainability',
      'investment',
    ]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingMinutes: z.number().int().positive(),
    relatedServiceSlugs: z.array(z.string()).default([]),
    relatedLocationSlugs: z.array(z.string()).default([]),
    image: z.string(),
  }),
});

export const collections = { journal };
