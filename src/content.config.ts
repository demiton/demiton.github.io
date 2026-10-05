import { defineCollection } from 'astro:content';
// `z` n'est plus exporté par astro:content (déprécié, retrait en Astro 8).
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	/* Starlight lit toujours cette collection pour surcharger ses libellés
	   d'interface (`src/content/i18n/<lang>.json`). Sans elle, chaque build
	   avertit « The collection "i18n" does not exist or is empty ». */
	i18n: defineCollection({
		loader: glob({ pattern: '**/*.json', base: './src/content/i18n' }),
		schema: i18nSchema(),
	}),
	blog: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			category: z.string(),
			tags: z.array(z.string()).default([]),
			cover: z.string(),
			draft: z.boolean().default(false),
		}),
	}),
};
