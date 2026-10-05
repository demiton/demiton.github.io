# AGENTS.md

Guide de travail pour les agents (et les humains) qui interviennent sur ce dépôt.

## État du projet

`demiton.github.io` est le site utilisateur GitHub Pages de Demiton, servi sur
<https://demiton.github.io>. Il a été migré de Gatsby vers **Astro**, mais ce n'est
**pas** un site de documentation Starlight classique : Starlight sert de socle
(recherche Pagefind, composants `Icon`/`Search`/`Pagination`, pages de doc) et
tout le reste — accueil, blog, header, footer — est écrit sur mesure.

L'ancien site Gatsby, l'admin Decap/Netlify CMS (`static/admin/`, adossé à un
endpoint OAuth sur Vercel) et les fichiers de configuration Gatsby ont été
supprimés. Il n'en reste aucune trace dans l'arbre de travail.

## Stack

| Paquet | Version | Rôle |
| --- | --- | --- |
| `astro` | ^7.2 | Framework de build (SSG) |
| `@astrojs/starlight` | ^0.42 | Socle doc : recherche, composants, pages `docs` |
| `@fontsource/anton` | ^5.3 | Police d'affichage (`--font-display`) |
| `@fontsource/barlow` | ^5.3 | Police de texte (`--font-body`) |
| `@fontsource/ibm-plex-mono` | ^5.3 | Police de code (`--font-mono`) |
| `sharp` | ^0.35 | Optimisation d'images |

`tsconfig.json` est en mode strict. `@astrojs/check` + `typescript` sont les seuls
outils de développement ; **il n'y a ni linter ni suite de tests**.

## Commandes

```bash
npm install            # dépendances
npm run dev            # serveur de dev sur http://localhost:4321
npm run build          # build de production dans ./dist/
npm run preview        # sert le build
npx astro check        # vérification de types (doit rester à 0 erreur / 0 warning)
```

### Environnement d'exécution (sandbox)

Dans un sandbox où `$HOME` n'est pas inscriptible, Astro échoue au démarrage avec
`EACCES: permission denied, mkdir '/home/<user>/.config/astro'` (télémétrie) et
`npm` échoue si son cache appartient à root. Contournement :

```bash
export ASTRO_TELEMETRY_DISABLED=1
export XDG_CONFIG_HOME=/tmp/xdg-demiton XDG_CACHE_HOME=/tmp/xdg-cache-demiton
npm install --cache /tmp/npm-cache-demiton
```

À noter : le lancement du serveur de dev en arrière-plan (`astro dev --background`)
décrit par les versions précédentes de ce fichier n'est **pas** une fonctionnalité
d'Astro — ne pas s'y fier.

## Architecture

### Deux chemins de rendu

1. **Pages sur mesure** (accueil, blog, article, à propos, contact) : elles
   utilisent `src/layouts/SiteLayout.astro`, qui pose un `<head>` minimal, le
   `SiteHeader` et le `SiteFooter`.
2. **Pages de documentation** (`/guides/*`, `/notes/*`, 404) : elles passent par
   le layout Starlight, dans lequel `SiteHeader`, `Footer` et `ThemeSelect` sont
   injectés via `components` dans `astro.config.mjs`.

Conséquence à garder en tête : les titres d'onglet ne sont pas composés au même
endroit. `SiteLayout` ajoute le suffixe `— Demiton` (désactivable via la prop
`appendSiteName`), tandis que Starlight utilise son propre gabarit avec `| Demiton`.

### Contenu

Deux collections, déclarées dans `src/content.config.ts` :

- **`docs`** — `docsLoader()` + `docsSchema()` de Starlight, dans
  `src/content/docs/`. Deux sections en `autogenerate` : `guides/` et `notes/`.
  Ajouter un fichier suffit à le faire apparaître dans la sidebar.
- **`blog`** — loader `glob` sur `src/content/blog/**/*.md`. Frontmatter requis :
  `title`, `description`, `date`, `category`, `cover` ; optionnels : `tags`, `draft`.

Les articles en `draft: true` sont exclus des listes et des routes.

### Composants et overrides

- `src/components/SiteHeader.astro` — sert **à la fois** d'override du `Header`
  Starlight et de header des pages sur mesure. Navigation identique partout ;
  menu mobile en `popover`.
- `src/components/SiteFooter.astro` — footer global. Utilise `width: 100vw` +
  marges négatives pour déborder de la colonne de contenu Starlight : toute
  modification de ce mécanisme doit être vérifiée sur les deux chemins de rendu.
- `src/components/ArticleCard.astro` — carte d'article (accueil + liste du blog).
- `src/overrides/Footer.astro` — conserve la pagination Starlight puis ajoute le
  footer global.
- `src/overrides/ThemeSelect.astro` — le thème est unique (dark) ; le sélecteur
  est neutralisé.
- `src/virtual-starlight.d.ts` — stubs de types pour les modules virtuels de
  Starlight, sans quoi `astro check` échoue.

### Styles et design tokens

`src/styles/custom.css` est l'unique source de vérité visuelle. Il définit des
tokens (`--color-*`, `--font-*`), puis les projette sur les variables Starlight
(`--sl-color-*`) pour que les pages de doc héritent du même thème.

Thème « Akira / Neo-Tokyo », dark uniquement (pas de bascule clair/sombre) :
fond `#0B0B0E`, surface `#16161B`, encre `#F2F1ED`, accent rouge Kaneda `#E8352B`,
cyan `#35D6D6`, violet `#6B4CE6`, jaune `#F5B400`, filet `#26262D`.

### Assets

- `src/assets/` — images traitées par le pipeline Astro (`sharp`).
- `public/` — fichiers servis tels quels (favicon, fond du hero, couvertures).

## Maquette

`design/pencil-demiton.pen` est la **source de vérité du design**. C'est un fichier
**JSON en clair** (Pencil, `version: 2.19`) — contrairement à ce qu'affirmaient les
versions précédentes de ce document, il n'est ni chiffré ni réservé à un serveur MCP,
et il peut être lu et modifié directement.

Il contient 12 écrans : Accueil, Page de documentation, Blog, Article Card, Footer,
Header, Article de blog, et leurs variantes mobiles (390 px). Les `variables` du
fichier correspondent exactement aux tokens de `custom.css` : toute évolution du
design doit se répercuter des deux côtés, sinon la maquette devient un document mort.

## Déploiement

`.github/workflows/deploy.yml` construit le site avec `withastro/action@v3`
(Node 22) puis publie avec `actions/deploy-pages@v4`. Déclenchement sur **push
vers `main`** et manuellement (`workflow_dispatch`).

Comme le dépôt est `<user>.github.io`, `site` vaut `https://demiton.github.io` et
aucun `base` n'est nécessaire. Le déploiement est vérifiable via l'API publique :

```bash
curl -sS "https://api.github.com/repos/demiton/demiton.github.io/actions/runs?per_page=5"
```

## Contribuer

Le workflow est **branche + Pull Request**, jamais de commit direct sur `main`.
Conventions de nommage : `feat/…`, `fix/…`, `content/…`, `chore/…`, `design/…`.

Avant toute PR : `npm run build` **et** `npx astro check` doivent passer sans
erreur. Voir `CONTRIBUTING.md` pour le détail.

## Documentation de référence

- Astro : <https://docs.astro.build>
- Starlight : <https://starlight.astro.build>

Sujets à consulter avant de travailler dessus :

- [Pages, routes dynamiques, middleware](https://docs.astro.build/en/guides/routing/)
- [Composants Astro](https://docs.astro.build/en/basics/astro-components/)
- [Collections de contenu](https://docs.astro.build/en/guides/content-collections/)
- [Styles](https://docs.astro.build/en/guides/styling/)
- [Internationalisation](https://docs.astro.build/en/guides/internationalization/)
