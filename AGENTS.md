# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du projet

Ce dépôt (`demiton.github.io`, un site utilisateur GitHub Pages) est en cours de migration de Gatsby vers **Astro + Starlight** (un thème de documentation). Les sources Gatsby, l'admin Decap/Netlify CMS (`static/admin/`, qui passait par un endpoint OAuth sur Vercel) et les fichiers de config Gatsby ont été supprimés dans l'arbre de travail.

Le site est configuré : titre `Demiton`, interface en français, sidebar `Guides`/`Notes` (autogenerate), `site: https://demiton.github.io`. Le thème visuel (style inspiré du template « Steve » : fond clair `#F9F9FF`, corail `#E45447`, cyan `#4CD3E3`, jaune `#F8B600`, typographies Poppins/Roboto/IBM Plex Mono via `@fontsource`) vit dans `src/styles/custom.css` et surcharge les variables CSS de Starlight. Les blocs de code utilisent le thème Expressive Code `dracula` avec fond `#222`. La maquette de référence est dessinée dans `design/pencil-demiton.pen` (outil pen.dev, extension VS Code Pencil — ne pas éditer le fichier à la main, il est chiffré ; passer par son serveur MCP).

**Le déploiement est fonctionnel :** `.github/workflows/deploy.yml` utilise `withastro/action@v3` (build Astro, Node 22) puis `actions/deploy-pages@v4`, déclenché sur push vers `main`. Comme c'est un dépôt `<user>.github.io`, `site` vaut `https://demiton.github.io` et aucun `base` n'est nécessaire.

## Commandes

- `npm run dev` : serveur de dev sur `localhost:4321`
- `npm run build` : build de production dans `./dist/`
- `npm run preview` : sert le site buildé
- `npx astro check` : vérification de types des fichiers `.astro`/TS (tsconfig strict)

Aucune suite de tests ni aucun linter n'est configuré.

**Node ≥ 22.12 requis** par Astro 7 : si le shell par défaut est en Node 20, passer par nvm (`nvm use 22`) avant `npm run build` / `npx astro check`.

Pour lancer le serveur de dev, utiliser le mode arrière-plan :

```
astro dev --background
```

Gérer le serveur avec `astro dev stop`, `astro dev status` et `astro dev logs`.

## Architecture

- Le contenu est en Markdown/MDX dans `src/content/docs/`. Chaque fichier devient une route d'après son chemin (`guides/bien-demarrer.md` → `/guides/bien-demarrer/`) ; `index.mdx` est la page d'accueil (template `splash` de Starlight avec un `hero` dans le frontmatter).
- `src/content.config.ts` définit l'unique collection `docs` avec `docsLoader`/`docsSchema` de Starlight. Tout champ de frontmatter personnalisé doit être ajouté en étendant `docsSchema`.
- La navigation se configure dans `astro.config.mjs`, via `starlight({ sidebar })`. Les deux groupes `Guides` et `Notes` sont en `autogenerate` : toute nouvelle page ajoutée sous `src/content/docs/guides/` ou `src/content/docs/notes/` apparaît automatiquement dans la sidebar.
- Les images référencées depuis le contenu vont dans `src/assets/` (optimisées via `sharp`) ; les fichiers servis tels quels vont dans `public/`.

## Documentation

- Astro : https://docs.astro.build
- Starlight : https://starlight.astro.build

Consulter ces guides avant de travailler sur les sujets correspondants :

- [Pages, routes dynamiques, middleware](https://docs.astro.build/en/guides/routing/)
- [Composants Astro](https://docs.astro.build/en/basics/astro-components/)
- [Composants React, Vue, Svelte ou autres frameworks](https://docs.astro.build/en/guides/framework-components/)
- [Ajout et gestion du contenu](https://docs.astro.build/en/guides/content-collections/)
- [Styles et Tailwind](https://docs.astro.build/en/guides/styling/)
- [Internationalisation](https://docs.astro.build/en/guides/internationalization/)
