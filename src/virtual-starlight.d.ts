// Modules virtuels exposés par l'intégration Starlight (résolus par son
// plugin Vite à la compilation). Starlight ne fournit pas de déclarations
// de types pour eux ; ces stubs évitent des erreurs `astro check` sur les
// composants qui les importent (overrides de Header/Footer/ThemeSelect).
declare module 'virtual:starlight/components/*' {
	import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
	const Component: AstroComponentFactory;
	export default Component;
}

declare module 'virtual:starlight/user-config' {
	import type { StarlightConfig } from '@astrojs/starlight/types';
	const config: StarlightConfig;
	export default config;
}
