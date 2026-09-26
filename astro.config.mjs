// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://demiton.github.io',
	integrations: [
		starlight({
			title: 'Demiton',
			locales: {
				root: {
					label: 'Français',
					lang: 'fr',
				},
			},
			logo: {
				src: './src/assets/logo.svg',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/demiton' }],
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				themes: ['dracula', 'dracula'],
			},
			sidebar: [
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Notes',
					items: [{ autogenerate: { directory: 'notes' } }],
				},
			],
		}),
	],
});
