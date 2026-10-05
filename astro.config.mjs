// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://demiton.github.io',
	integrations: [
		starlight({
			title: 'Demiton',
			// Séparateur aligné sur celui des pages sur mesure (SiteLayout),
			// qui utilisaient déjà « — ». Sans cela, les pages de doc
			// affichaient « Bien démarrer | Demiton » et les autres
			// « À propos — Demiton ».
			titleDelimiter: '—',
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
			components: {
				Header: './src/components/SiteHeader.astro',
				Head: './src/overrides/Head.astro',
				Footer: './src/overrides/Footer.astro',
				ThemeSelect: './src/overrides/ThemeSelect.astro',
				PageTitle: './src/overrides/PageTitle.astro',
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
