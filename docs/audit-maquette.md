# Audit d'écart maquette ↔ implémentation — Demiton

> Rapport généré à partir de `design/pencil-demiton.pen` (version 2.19, 12 écrans)
> et du code de `src/`, du CSS de production dans `dist/_astro/` et du HTML
> effectivement rendu dans `dist/`.

## 1. Objet, méthode, artefacts

### 1.1 Extraction de la maquette

`scripts/pen-spec.mjs` (déjà présent, non réécrit) a été utilisé tel quel :

```bash
node scripts/pen-spec.mjs --tokens                 # variables + inventaire
node scripts/pen-spec.mjs --out docs/pen-spec.txt  # arbre texte des 12 écrans
node scripts/pen-spec.mjs --json --out docs/pen-spec.json
```

Artefacts produits (dans le dépôt, pas dans `/tmp`) :

| Fichier | Contenu |
| --- | --- |
| `docs/pen-spec.txt` | 953 lignes, arbre complet des 12 écrans, `ref` développés, tokens résolus |
| `docs/pen-spec.json` | 1 237 181 octets, spec sérialisée (variables + écrans) |

Ces deux fichiers sont des **artefacts de travail** reproductibles par la commande ci-dessus :
ils peuvent être supprimés sans perte, seul `docs/audit-maquette.md` est le livrable.

### 1.2 Construction du site et inspection du rendu

```bash
export ASTRO_TELEMETRY_DISABLED=1 XDG_CONFIG_HOME=/tmp/xdg-demiton XDG_CACHE_HOME=/tmp/xdg-cache-demiton
npm run build     # 16 pages, exit 0 — dist/ reconstruit
```

Le build émet deux avertissements Starlight non bloquants, sans lien avec la maquette :
`The collection "i18n" does not exist or is empty` et `Entry docs → 404 was not found`.

Les valeurs « code » citées ci-dessous proviennent de :

- `src/styles/custom.css` (source de vérité des tokens) ;
- `src/components/{SiteHeader,SiteFooter,ArticleCard}.astro`, `src/layouts/SiteLayout.astro`,
  `src/pages/*.astro` ;
- pour les pages de documentation : `dist/_astro/common.DZud2Rhn…css` (feuille Starlight),
  `dist/_astro/SiteHeader.qaqzvnE9.css`, `dist/_astro/ec.qa5j1.css` (Expressive Code) ;
- pour le HTML : `dist/index.html`, `dist/blog/index.html`,
  `dist/blog/migrer-de-gatsby-vers-astro/index.html`, `dist/notes/memo-git/index.html`,
  `dist/guides/bien-demarrer/index.html`.

**Cascade** : les règles de `custom.css` sont émises **hors `@layer`** (position 9 343 du
bundle) tandis que celles de Starlight sont dans `@layer starlight.core` / `starlight.components`.
Une règle non layerée l'emporte sur toute règle layerée, **quelle que soit la spécificité** :
c'est ce qui rend effectif le `site-search button { border-radius:999px }` de `custom.css`
malgré la règle Starlight `button[data-open-modal]{border-radius:.5rem}`. Les comparaisons
ci-dessous en tiennent compte.

### 1.3 Les deux chemins de rendu (rappel)

| Chemin | Pages | Header | CSS de référence |
| --- | --- | --- | --- |
| Sur mesure (`SiteLayout.astro`) | `/`, `/blog/`, `/blog/[slug]/`, `/a-propos/`, `/contact/` | `.page-header` + `SiteHeader` | `SiteLayout.CQ7vL8cl.css` |
| Starlight (layout doc + overrides) | `/guides/*`, `/notes/*`, `404` | `SiteHeader` injecté dans `.header` Starlight | `common.DZud2Rmm.css` |

### 1.4 Échelle de gravité utilisée

| Gravité | Définition |
| --- | --- |
| **bloquant** | élément absent ou de nature différente, disposition/structure différente, ou écart ≥ 64 px sur une dimension structurante |
| **visible** | écart perceptible à l'œil : couleur, graisse, rayon, bordure, écart de 4 à 63 px |
| **cosmétique** | ≤ 3 px, casse, ponctuation, arrondi de conversion `rem`/`px` |
| conforme | valeur identique des deux côtés (listé pour mémoire, non compté comme écart) |

### 1.5 Limites de la comparaison

Le `.pen` **ne définit la hauteur d'aucun cadre** : les 12 écrans racines ont une largeur
(1440 / 390 / 340) mais `height = undefined`, et 1 613 nœuds sur 1 855 n'ont pas de hauteur
explicite (873 n'ont pas de largeur). Les hauteurs de maquette citées dans ce rapport sont
donc soit des hauteurs explicites portées par un enfant (`Hero 800px`, `Cover 190px`,
`Icon circle 72px`, `Menu button 36px`…), soit des **valeurs déduites** signalées comme telles.
Aucune mesure au pixel près n'a été faite dans un navigateur (aucun outil headless n'est
installé : ni Playwright ni Puppeteer ni jsdom) : les valeurs « code » sont des valeurs
calculées de CSS, pas des `getComputedStyle()`.

---

## 2. Tokens et polices — conformité

Les 14 variables du `.pen` correspondent **exactement** aux tokens de `custom.css`, sans
aucun écart (comparaison `--tokens` ↔ `:root` de `custom.css`).

| Token | Maquette | Code (`src/styles/custom.css`) | Gravité |
| --- | --- | --- | --- |
| `$bg` | `#0B0B0E` | `--color-bg: #0b0b0e` | conforme |
| `$surface` | `#16161B` | `--color-surface: #16161b` | conforme |
| `$ink` | `#F2F1ED` | `--color-ink: #f2f1ed` | conforme |
| `$ink-2` | `#93939C` | `--color-ink-2: #93939c` | conforme |
| `$accent` | `#E8352B` | `--color-accent: #e8352b` | conforme |
| `$accent-soft` | `#2A1416` | `--color-accent-soft: #2a1416` | conforme |
| `$cyan` | `#35D6D6` | `--color-cyan: #35d6d6` | conforme |
| `$magenta` | `#6B4CE6` | `--color-violet: #6b4ce6` | conforme |
| `$yellow` | `#F5B400` | `--color-yellow: #f5b400` | conforme |
| `$hairline` | `#26262D` | `--color-hairline: #26262d` | conforme |
| `$code-bg` | `#0A0A0D` | `--color-code-bg: #0a0a0d` | conforme |
| `$font-display` | `Anton` | `--font-display: 'Anton', …` + `@fontsource/anton` | conforme |
| `$font-body` | `Barlow` | `--font-body: 'Barlow', …` + `@fontsource/barlow/{400,500,600,700}` | conforme |
| `$font-mono` | `IBM Plex Mono` | `--font-mono: 'IBM Plex Mono', …` + `@fontsource/ibm-plex-mono/{400,500}` | conforme |

**En revanche, la maquette utilise des gris et des blancs « bruts » qui ne sont pas des
tokens**, et le code leur substitue des tokens : c'est la source des écarts du footer
(section 3.3) et de la ligne « Divider ». Idem pour les couleurs de syntaxe des blocs de
code (section 3.5).

---

## 3. Écrans « composants partagés »

### 3.1 Écran `Header` (1440, id `pHVQk`)

Écran de référence de la barre de navigation desktop. Le `.pen` définit **deux variantes** :
celle-ci (`Header`, padding `[20 48]`, marque Anton 22 px, `Nav` gap 28 px, liens Barlow 14 px
poids 400/500) et la variante posée dans le hero de l'Accueil (`#ZgVlb`, padding `[28 48]`,
marque Anton 24 px, `Nav` gap 32 px, liens poids 500). Le code n'en implémente qu'une.

| Élément | Valeur maquette | Valeur code | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Padding horizontal du header | `48px` | sur mesure `3rem = 48px` ; Starlight `--sl-nav-pad-x = 1.5rem = 24px` (≥ 50em) | Header, Page de documentation, Blog, Article de blog | **visible** |
| Padding vertical du header | `20px` | sur mesure `1rem = 16px` ; Starlight `--sl-nav-pad-y = .75rem = 12px` | Header, Page de documentation, Blog, Article de blog | **visible** |
| Hauteur du header | non définie dans le `.pen` ; déduite ≈ `20 + 26 + 20 ≈ 66px` (incertitude 1.5) | sur mesure ≈ 56 px (16×2 + 24) ; Starlight `--sl-nav-height = 4rem = 64px` fixe (≥ 50em), `3.5rem = 56px` en dessous | Header, Page de documentation, Blog, Article de blog | **visible** |
| Marque « Demiton » | Anton `22px`, `#F2F1ED`, poids `700` | `1.25rem = 20px`, `var(--color-ink)` `#F2F1ED`, poids `400` (`h…`/`.brand`) | Header | cosmétique (−2 px, graisse Anton unique) |
| Liens de nav (Docs, À propos, Contact) | Barlow `14px`, poids `400`, `#93939C` | `0.875rem = 14px`, poids `500`, `var(--color-ink-2)` `#93939C` | Header | cosmétique |
| Lien « Blog » | Barlow `14px`, poids `500`, `#E8352B` | `14px`, poids `500`, `var(--color-accent)` `#E8352B` | Header | conforme |
| Espacement de la nav | `gap: 32px` (variante hero Accueil) / `28px` (variante Header) | `1.75rem = 28px` | Header | cosmétique |
| Champ de recherche — forme | fond `#0B0B0E`, bordure `1px #26262D`, rayon `999px`, padding `[8 14]`, gap `8px` | fond `#0B0B0E` ✓, bordure `1px #26262D` ✓, rayon `999px` ✓, gap `.5rem = 8px` ✓, padding-inline `.75rem .5rem = 12px 8px`, hauteur figée `2.5rem = 40px` | Header, Page de documentation, Blog, Article de blog | cosmétique |
| Champ de recherche — libellé | un seul texte « Rechercher…  Ctrl K », Barlow `13px`, `#93939C` | « Rechercher » (`.875rem = 14px`) + deux badges `<kbd>` « Ctrl » / « K » (`--sl-text-2xs = .75rem = 12px`, fond `--sl-color-gray-6` = `#16161B`, rayon `4px`) | Header | **visible** |
| Champ de recherche — icône | `14px × 14px` | `16px × 16px` (attributs du `<svg>`) | Header | cosmétique |
| Champ de recherche — état | visible en permanence dans le header | masqué sous `50rem` (le `<Search>` est un enfant de `.nav` qui passe à `display:none`) | Header / Mobile Header | conforme (la variante mobile de la maquette n'a pas de recherche) |

### 3.2 Écran `Mobile Header` (390, id `rUuur`)

| Élément | Valeur maquette | Valeur code | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Padding | `16px 20px` | sur mesure `0.85rem 1.25rem = 13.6px 20px` ; Starlight `12px 16px` | Mobile Header, Accueil (mobile), Page de documentation (mobile), Blog (mobile), Article de blog (mobile) | **visible** |
| Marque « Demiton » | Anton `18px` | `1.25rem = 20px` | Mobile Header, tous les écrans mobiles | cosmétique |
| Bouton menu — cadre | `36×36px`, `radius 8px`, fond `#0B0B0E`, **aucune bordure** | `2.25rem = 36px` ✓, `8px` ✓, `var(--color-bg)` ✓, **bordure `1px #26262D`** | Mobile Header | **visible** |
| Bouton menu — icône | `18×18px` | `1.25rem = 20px` | Mobile Header | cosmétique |
| Bordure basse du header | `1px #26262D` | `border-bottom: 1px solid var(--color-hairline)` ✓ | Mobile Header | conforme |
| Nombre de boutons d'ouverture | 1 (le bouton menu) | **2 sur `/guides/*` et `/notes/*` en dessous de 800 px** : le `.menu-toggle` du `SiteHeader` **et** le `sl-menu-button` de Starlight (`2rem = 32px`, rond, `background: var(--sl-color-white)`, `position: fixed`, `inset-inline-end: var(--sl-nav-pad-x)`, `top: calc((var(--sl-nav-height) - var(--sl-menu-button-size)) / 2) = 12px`) — les deux occupent le même coin | Mobile Header → Page de documentation (mobile) | **bloquant** |

### 3.3 Écran `Footer` (1440, id `J6xBJQ`)

| Élément | Valeur maquette | Valeur code | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Padding | `64px 48px 32px` (`[64 48 32 48]`) | `3rem 3rem 1.75rem = 48px 48px 28px` | Footer, Accueil, Blog, Article de blog, Page de documentation | **visible** |
| Gap vertical | `32px` | `2rem = 32px` | Footer | conforme |
| Marque | Anton `22px`, `#FFFFFF` | Anton `1.375rem = 22px` ✓, `var(--color-ink)` `#F2F1ED` | Footer | cosmétique |
| Tagline | Barlow `13px`, `#999999` | `0.8rem = 12.8px`, `var(--color-ink-2)` `#93939C` | Footer | cosmétique |
| Liens de nav | `Docs`, `GitHub`, `Contact`, gap `28px`, Barlow `13px`, `#CCCCCC` | mêmes libellés ✓, `1.75rem = 28px` ✓, `0.8rem = 12.8px`, **`#93939C`** | Footer | **visible** (`#CCCCCC` vs `#93939C`) |
| Séparateur | `1px #3A3A3A` | `1px solid var(--color-hairline)` = `#26262D` | Footer | **visible** |
| Copyright | « © 2026 Demiton — **P**ropulsé par Astro + Starlight », Barlow `12px`, `#777777` | « © 2026 Demiton — **p**ropulsé par Astro + Starlight », `0.75rem = 12px` ✓, **`#93939C`** | Footer | **visible** (couleur) + cosmétique (casse) |

Le footer est le **même composant** sur les deux chemins de rendu. Sur le chemin Starlight il
est sorti de la colonne de contenu par `width: 100vw` + `margin-inline: -50vw` +
`left/right: 50%` (`SiteFooter.astro`) — mécanisme à vérifier visuellement, non mesurable ici
(incertitude 6.4).

### 3.4 Écran `Article Card` (340, id `uFzZS`)

| Élément | Valeur maquette | Valeur code (`ArticleCard.astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Cadre | `340px` de large, `radius 8px`, `1px #26262D`, fond `#16161B` | `radius 8px` ✓, `1px var(--color-hairline)` ✓, `var(--color-surface)` ✓ ; largeur réelle `1fr` = **432 px** (accueil, 3 colonnes dans 1344 px) et **490 px** (blog, 2 colonnes dans 1004 px) | Article Card, Accueil, Blog | **visible** (voir incertitude 6.1) |
| Couverture | hauteur `190px` | `height: 190px` ✓ | Article Card | conforme |
| Corps | padding `20px`, gap `10px` | `padding: 1.25rem = 20px` ✓, `gap: .6rem = 9.6px` | Article Card | cosmétique |
| Date | IBM Plex Mono `11px`, `#E8352B` | `0.7rem = 11.2px`, `var(--color-accent)` ✓ | Article Card | cosmétique |
| Pastille catégorie — texte | `ASTRO` (majuscules), IBM Plex Mono `10px`, poids `600`, `ls=1`, `#E8352B` | « Astro » (casse normale), `0.65rem = 10.4px`, poids `600` ✓, `letter-spacing: .05em ≈ 0.52px`, `#E8352B` ✓ | Article Card, Accueil, Blog | **visible** (casse + `ls` 0.52 vs 1) |
| Pastille catégorie — cadre | fond `#2A1416`, `radius 999px`, padding `[4 10]` | fond `var(--color-accent-soft)` ✓, `999px` ✓, `padding: .25rem .6rem = 4px 9.6px` | Article Card | cosmétique |
| Titre | Anton `17px`, poids `600`, `#F2F1ED` | `1.0625rem = 17px` ✓, poids `400`, `var(--color-ink)` ✓ | Article Card | cosmétique |
| Extrait | Barlow `13px`, `lh 1.6`, `#93939C` | `0.8125rem = 13px` ✓, `1.6` ✓, `var(--color-ink-2)` ✓ | Article Card | conforme |
| Lien | Barlow `13px`, poids `500`, `#E8352B` | `0.8125rem = 13px` ✓, `500` ✓, `var(--color-accent)` ✓ | Article Card | conforme |

---

## 4. Écrans desktop

### 4.1 `Accueil` (1440, id `tZEWp`)

| Élément | Valeur maquette | Valeur code (`src/pages/index.astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Hauteur du hero | `800px` (explicite sur `Hero #DwZAm`) | `min-height: 32rem = 512px` (`.hero`) | Accueil | **bloquant** (−288 px) |
| Image de fond | `image(locale: generated.png)` | `style="background-image: url(/background_demiton.webp)"` (`public/background_demiton.webp`) | Accueil | cosmétique (asset différent, même rôle ; `generated.png` reste à la racine du dépôt, non utilisé par le build) |
| Voile | `#08080ACC` → `rgb(8,8,10)` à **α 0.80** | `rgba(8, 8, 10, 0.85)` | Accueil | cosmétique |
| Header posé sur le hero | padding `28px 48px`, marque Anton `24px`, `Nav` gap `32px`, liens poids `500` | padding `1rem 3rem = 16px 48px`, marque `20px`, gap `28px`, liens poids `500` | Accueil | **visible** (padding) + cosmétiques |
| Gap du bloc héros | `Hero gap = 28px` (titre → sous-titre → CTA) | `.hero-content { gap: 1rem = 16px }` | Accueil | **visible** (−12 px) |
| Titre « DEMITON DOCS » | Anton `72px`, `ls=1`, deux textes dans un cadre horizontal `gap 14px` | `clamp(2.5rem, 6vw, 4.5rem)` → **72 px à ≥ 1200 px**, `letter-spacing: .02em ≈ 1.44px`, deux `<span>` séparés par un espace | Accueil | cosmétique (à 1440 px la taille est exacte ; en dessous de 1200 px la maquette ne prévoit pas de fluide) |
| Sous-titre | Barlow `16px`, poids `600`, `ls=2`, `#35D6D6` | `0.9rem = 14.4px`, poids `600` ✓, `letter-spacing: .1em ≈ 1.44px`, `var(--color-cyan)` ✓ | Accueil | cosmétique |
| CTA « Explorer les guides » | bordure `2px #E8352B`, `radius 999px`, padding `[14 40]`, libellé Barlow `15px` poids `500` `#F2F1ED` | `2px` ✓, `999px` ✓, `padding: .85rem 2.25rem = 13.6px 36px`, `0.9rem = 14.4px` ✓ poids `500` | Accueil | cosmétique |
| Section Features — padding | `100px 48px 80px` | `5rem 3rem 4rem = 80px 48px 64px` | Accueil | **visible** (−20 / −16 px) |
| Section Features — titre | Anton `36px`, `ls=1` | `1.75rem = 28px`, `ls .02em` | Accueil | **visible** (−8 px) |
| Section Features — sous-titre | Barlow `16px`, `#93939C` | `16px` (hérité), `var(--color-ink-2)` ✓ | Accueil | conforme |
| Rangée de cartes — retrait haut | `padding: [48 0 0 0]` | `.feature-grid { margin-top: 2rem = 32px }` | Accueil | **visible** (−16 px) |
| Rangée de cartes — largeur | `fill_container` dans `padding [100 48 …]` → ≈ `1344px` | `max-width: 70rem = 1120px` centré | Accueil | **visible** (−224 px) |
| Carte feature | `radius 14px`, bordure haute `3px`, fond `#16161B`, padding `[32 24]`, gap `16px` | `14px` ✓, `3px` ✓, `var(--color-surface)` ✓, `2rem 1.5rem = 32px 24px` ✓, `1rem = 16px` ✓ | Accueil | conforme |
| Index « 01 » | Anton `44px`, `#FFFFFF12`, position `@16px, 8px` | `2.75rem = 44px` ✓, `rgb(255 255 255 / 7%)` = `#FFFFFF12` ✓, `top: .5rem = 8px` ✓, `left: 1rem = 16px` ✓ | Accueil | conforme |
| Pastille d'icône | `72×72px`, `radius 18px`, bordure `2px`, fond `#0A0A0D`, icône `30px` | `4.5rem = 72px` ✓, `18px` ✓, `2px` ✓, `var(--color-code-bg)` ✓, icône `1.75rem = 28px` | Accueil | cosmétique (icône −2 px) |
| Titre de carte | Anton `20px` | `1.25rem = 20px` ✓ | Accueil | conforme |
| Texte de carte | Barlow `14px`, `lh 1.6`, `#93939C` | `0.875rem = 14px` ✓, `1.6` ✓, `var(--color-ink-2)` ✓ | Accueil | conforme |
| Panneaux « Guides & Notes » — padding | `40px 48px 100px` | `0 3rem 5rem = 0 48px 80px` | Accueil | **visible** (haut `0` vs `40px`, bas `80px` vs `100px`) |
| Panneau | `radius 8px`, bordure `1px #26262D` + haute `3px`, padding `40px`, gap `16px`, fond `#16161B` | identique ✓ | Accueil | conforme |
| Pastille de panneau | `48×48px`, `radius 14px`, bordure `2px`, icône `22px` | `3rem = 48px` ✓, `14px` ✓, `2px` ✓, icône `1.375rem = 22px` ✓ | Accueil | conforme |
| Titre / texte / lien de panneau | Anton `24px` ; Barlow `15px` `lh 1.6` ; Barlow `14px` poids `500` | `1.5rem = 24px` ✓ ; `0.9375rem = 15px` ✓ `1.6` ✓ ; `0.875rem = 14px` ✓ `500` ✓, accent/cyan ✓ | Accueil | conforme |
| « Derniers articles » — padding | `40px 48px 100px` | `0 3rem 5rem = 0 48px 80px` | Accueil | **visible** |
| « Derniers articles » — gap | `32px` | `1.5rem = 24px` | Accueil | **visible** |
| Titre de section | Anton `28px` | `1.5rem = 24px` | Accueil | **visible** (−4 px) |
| Lien « Voir plus → » | Barlow `14px`, poids `500`, `#E8352B` | `0.875rem = 14px` ✓, `500` ✓, `var(--color-accent)` ✓ | Accueil | conforme |
| Grille d'articles | 2 rangées de 3 cartes de `340px`, gap `24px` (6 articles) | 3 colonnes `1fr` (≈ 432 px), gap `1.5rem = 24px` ✓, **5 articles max** (`slice(0, 5)`) | Accueil | **visible** (nombre + largeur ; voir incertitude 6.1) |
| Comportement du header | header `absolute` **dans** le hero | `position: fixed` + `data-transparent`, opacifié au scroll (`is-solid` si `scrollY > 40`) | Accueil | incertitude 6.5 (comportement non maquetté) |

### 4.2 `Page de documentation` (1440, id `UZHpq`)

Le `.pen` de cet écran contient une anomalie : le second `ref` (ligne 231 de
`docs/pen-spec.txt`) s'appelle `"Footer"` mais pointe en réalité vers le composant
**`Header`** (`REF->Header`). Le bas de la maquette de cette page n'est donc pas exploitable
comme footer de référence (incertitude 6.3).

| Élément | Valeur maquette | Valeur code (rendu Starlight, `dist/notes/memo-git/index.html`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Fil d'Ariane | texte « Notes  /  Mémo Git », Barlow `12px`, `#93939C` | **aucun fil d'Ariane dans le HTML rendu** (Starlight n'en émet pas par défaut, aucun override) | Page de documentation, Page de documentation (mobile) | **bloquant** (élément absent) |
| Titre de page | Anton `40px`, `#F2F1ED` | Anton `--sl-text-5xl = 2.625rem = 42px` (≥ 50em), `var(--sl-color-white)` = `#F2F1ED` ✓ | Page de documentation | cosmétique (+2 px) |
| Intro | Barlow `15px`, `lh 1.7`, `#93939C` | `16px` (`--sl-text-base`), `--sl-line-height: 1.75`, `--sl-color-text` (`#b3b3bc`) | Page de documentation | cosmétique |
| Titres H2 | Anton `24px`, `#F2F1ED`, poids `700` | Anton `--sl-text-h2 = --sl-text-4xl = 2.1875rem = 35px` (≥ 50em), poids `400` | Page de documentation | **visible** (+11 px) |
| Largeur du contenu | cadre `960px` − padding `56×2` → **848 px** utiles | `--sl-content-width: 45rem = 720px`, padding `--sl-content-pad-x = 1.5rem` (≥ 72rem) → **672 px** utiles | Page de documentation | **visible** (−176 px) |
| Padding du contenu | `40px 56px` | `1.5rem` vertical (`--sl-content-gap-y`) et `1.5rem = 24px` horizontal (≥ 72rem) ; `16px` en dessous | Page de documentation | **visible** (horizontal 24 vs 56) |
| Sidebar — largeur | `272px` | `--sl-sidebar-width: 18.75rem = 300px` | Page de documentation | **visible** (+28 px) |
| Sidebar — padding | `28px`, gap `28px` | `--sl-sidebar-pad-x: 1rem = 16px` + `.sidebar-content{padding:1rem 1rem 0}` ; gap `1rem = 16px` | Page de documentation | **visible** |
| Sidebar — fond et filet | fond `#0B0B0E`, filet droit `1px #26262D` | `--sl-color-bg-sidebar` = `var(--color-bg)` `#0B0B0E` ✓, `border-inline-end: 1px solid var(--sl-color-hairline-shade)` = `#26262D` ✓ | Page de documentation | conforme |
| Libellés de section | « GUIDES » / « NOTES » Anton `12px`, `ls=1.5`, `#93939C` | `span.large` : Barlow `--sl-text-lg = 1.125rem = 18px` (et `--sl-text-base = 16px` en dessous de 72rem), `var(--sl-color-white)` `#F2F1ED`, poids `600`, casse normale | Page de documentation | **visible** |
| Items de sidebar | Barlow `14px`, padding `[8 12]`, `radius 999px` | Barlow `--sl-text-sm = .875rem = 14px` ✓, `padding: .3em .5rem ≈ 4.2px 8px`, `border-radius: .25rem = 4px` | Page de documentation | **visible** (rayon et padding) |
| Item actif | fond `#2A1416`, texte `#E8352B` poids `500`, **pastille `7×7px` `#E8352B`** | fond `var(--sl-color-text-accent)` = `#E8352B` **plein**, texte `var(--sl-color-text-invert)` = `#2A1416`, poids `600`, **aucune pastille** | Page de documentation | **visible** (couleurs inversées) |
| Structure de la sidebar | listes plates, 3 items par section | groupes `<details open>` repliables avec `caret` (chevron `1.25rem`), 1 item par section dans le contenu actuel | Page de documentation | **visible** |
| TOC — largeur | `208px` | `--sl-sidebar-width: 18.75rem = 300px` (même variable que la sidebar) | Page de documentation | **visible** (+92 px) |
| TOC — padding / gap | `28px` / `12px` | `--sl-sidebar-pad-x: 1rem = 16px` / `1rem = 16px` | Page de documentation | **visible** |
| TOC — titre | « SUR CETTE PAGE » Anton `12px`, `ls=1.5`, `#93939C` | « Sur cette page » (casse normale), h2 → Anton `--sl-text-h5 = --sl-text-lg = 1.125rem = 18px`, poids `400`, `var(--sl-color-white)` `#F2F1ED` | Page de documentation | **visible** |
| TOC — items | Barlow `13px` ; actif `#E8352B` poids `500`, autres `#93939C` | `--sl-text-xs = .8125rem = 13px` ✓ ; actif `var(--sl-color-text-accent)` = `#ff5c50` (token custom), autres `var(--sl-color-gray-3)` = `#93939C` ✓ | Page de documentation | cosmétique |
| Bloc de code — cadre | fond `#0A0A0D`, `radius 12px`, **aucune bordure** | fond `#0A0A0D` ✓ (`--ec-codeBg`), `radius = --ec-brdRad 0px + --ec-brdWd 1px` → **quasi carré**, bordure `1px #3C3F51` (`--ec-brdCol`, non surchargée) | Page de documentation, Article de blog | **visible** |
| Bloc de code — en-tête | 3 pastilles `10×10px` (`#E8352B`, `#F5B400`, `#35D6D6`) + nom de fichier IBM Plex Mono `11px` `#999999` | cadre `is-terminal` d'Expressive Code : `.title` **vide** (rendu `\a0`), aucun nom de fichier, **aucune pastille de couleur** | Page de documentation, Article de blog | **visible** |
| Bloc de code — police | IBM Plex Mono `13px` | `--ec-codeFontSize: var(--sl-text-code) = --sl-text-sm = .875rem = 14px`, `--ec-codeLineHt: --sl-line-height = 1.75` | Page de documentation, Article de blog | cosmétique |
| Bloc de code — couleurs | commandes `#4CD3E3`, commentaires `#777777`, surlignage `#F8B600` | thème **Dracula** : `#50FA7B`, `#F8F8F2`, `#F1FA8C`, `#BD93F9`, `#96A1C2`, `#FF79C6`, `#E9F284` (`astro.config.mjs` : `themes: ['dracula','dracula']`) | Page de documentation, Article de blog | **visible** |
| Encadré « Astuce » | bordure gauche `4px #35D6D6`, `radius 12px`, **sans fond**, padding `16px`, icône `18px` cyan, titre Anton `13px` `#F2F1ED` | `.starlight-aside--tip` : bordure gauche `.25rem = 4px` ✓ mais `var(--sl-color-purple)` = `#6B4CE6`, fond `var(--sl-color-purple-low)` (défaut Starlight, non surchargé), `padding: 1rem = 16px` ✓, **`border-radius: 0`**, titre Barlow `--sl-text-h5 = 18px` poids `600` | Page de documentation | **visible** |
| Encadré « Note » (page `/guides/bien-demarrer/`) | non présent dans la maquette | `.starlight-aside--note` : bordure `var(--sl-color-blue)` = `#35D6D6` ✓ mais fond `--sl-color-blue-low` | hors maquette | — |
| Prev / Next — nombre | 2 cartes (`← PRÉCÉDENT` + `SUIVANT →`) | 1 seule carte quand un seul voisin existe (`memo-git` → seulement `Précédent`, `bien-demarrer` → seulement `Suivant`) | Page de documentation | **visible** |
| Prev / Next — carte | fond `#16161B`, bordure `1px #26262D`, `radius 8px`, padding `16px`, eyebrow IBM Plex Mono `11px` `ls=1`, titre Anton `16px` | fond **transparent**, bordure `1px var(--sl-color-gray-5)` = `#35353D`, `border-radius: .5rem = 8px` ✓, `padding: 1rem = 16px` ✓, **`box-shadow: var(--sl-shadow-md)`**, libellé « Précédent »/« Suivant » Barlow `16px` + icône `1.5rem = 24px`, titre `.link-title` `--sl-text-2xl = 1.5rem = 24px` Barlow | Page de documentation | **visible** |

### 4.3 `Blog` (1440, id `oyCWD`)

| Élément | Valeur maquette | Valeur code (`src/pages/blog/index.astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Bandeau de titre — padding | `80px 48px 48px` | `4rem 3rem 3rem = 64px 48px 48px` | Blog | **visible** (−16 px en haut) |
| Bandeau de titre — H1 | Anton `48px` | `2.5rem = 40px` | Blog | **visible** (−8 px) |
| Bandeau de titre — sous-titre | Barlow `16px`, `#93939C` | `16px` ✓, `var(--color-ink-2)` ✓ | Blog | conforme |
| Bandeau — fond / filet | `#16161B` + filet bas `1px #26262D` | `var(--color-surface)` ✓ + `1px solid var(--color-hairline)` ✓ | Blog | conforme |
| Featured — retrait | `padding: 48px 48px 0` | `2.5rem 3rem 0 = 40px 48px 0` | Blog | **visible** |
| Featured — carte | `radius 12px`, bordure `1px #26262D`, fond `#16161B` | `radius 8px`, bordure `var(--color-hairline)` ✓, fond `var(--color-surface)` ✓ | Blog | **visible** |
| Featured — couverture | `340px` de haut | `height: 340px` ✓ (desktop) | Blog | conforme |
| Featured — corps | padding `48px`, gap `16px` | `2.5rem = 40px`, `1rem = 16px` ✓ | Blog | **visible** |
| Featured — eyebrow | IBM Plex Mono `12px`, `#E8352B` | `0.75rem = 12px` ✓, `var(--color-accent)` ✓ | Blog | conforme (contenu : « 27 SEPTEMBRE 2026 » vs maquette « 12 SEPT. 2026 ») |
| Featured — titre | Anton `32px`, poids `700` | `1.75rem = 28px`, poids `400` | Blog | **visible** (−4 px) |
| Featured — extrait | Barlow `15px`, `lh 1.7`, `#93939C` | `16px`, `line-height: 1.7` ✓, `var(--color-ink-2)` ✓ | Blog | cosmétique |
| Featured — bouton | padding `12px 32px`, bordure `2px #E8352B`, `radius 999px`, libellé Barlow `14px` | `padding: .7rem 1.75rem = 11.2px 28px`, `2px` ✓, `999px` ✓, `0.875rem = 14px` ✓ | Blog | cosmétique |
| Corps — padding | `24px 48px 80px` | `2.5rem 3rem 5rem = 40px 48px 80px` | Blog | **visible** (+16 px en haut) |
| Corps — gap colonne/sidebar | `40px`, sidebar `300px` | `gap: 2.5rem = 40px` ✓, `grid-template-columns: 1fr 300px` ✓ | Blog | conforme |
| « Articles récents » | Anton `24px` | `1.375rem = 22px` | Blog | cosmétique |
| Grille d'articles | 3 rangées de 2 cartes, gap `24px` | 2 colonnes, gap `1.5rem = 24px` ✓ (8 cartes rendues) | Blog | conforme (structure) |
| Widget — titre | Anton `13px`, `ls=1.5`, `#93939C`, majuscules (« CATÉGORIES », « TAGS ») | `0.8rem = 12.8px`, `letter-spacing: .1em ≈ 1.28px`, `#93939C` ✓, casse normale (« Catégories », « Tags ») | Blog | **visible** (casse + `ls`) |
| Widget — gap | `14px` | `0.9rem = 14.4px` | Blog | conforme |
| Ligne catégorie | padding `[8 0]`, libellé Barlow `14px`, filet bas `1px #26262D` | `padding: .6rem 0 = 9.6px 0`, `0.9rem = 14.4px`, filet `var(--color-hairline)` ✓ | Blog | cosmétique |
| Compteur de catégorie | fond `#0A0A0D`, `radius 999px`, padding `[3 10]`, IBM Plex Mono `11px` poids `600`, **couleur propre à chaque catégorie** (`#E8352B`, `#35D6D6`, `#6B4CE6`, `#F5B400`, `#E8352B`) | fond `var(--color-code-bg)` ✓, `999px` ✓, `padding: .2rem .6rem = 3.2px 9.6px`, `0.75rem = 12px`, poids hérité, **couleur héritée** (`--color-ink` `#F2F1ED`) | Blog | **visible** (couleurs absentes) |
| Nuage de tags | Barlow `12px`, `#93939C`, bordure `1px #26262D`, `radius 999px`, padding `[6 14]`, gap `10px` | `0.75rem = 12px` ✓, ✓, ✓, ✓, `padding: .35rem .85rem = 5.6px 13.6px`, `gap: .6rem = 9.6px` | Blog | cosmétique |
| Pagination | `← Précédent`, pages `36×36px` (`1` fond `#E8352B`, `2`/`3` fond `#16161B` + bordure), `Suivant →`, padding `0 48px 80px`, gap `12px`, libellés Barlow `14px` | **aucun élément de pagination dans `dist/blog/index.html`** | Blog, Blog (mobile) | **bloquant** (élément absent) |
| Format de date des cartes | « 12 SEPT. 2026 » (mois abrégé **avec point**) | « 20 SEPT 2026 » (`toLocaleDateString` puis `.replace('.', '')` dans `ArticleCard.astro`) | Blog, Accueil | cosmétique |

### 4.4 `Article de blog` (1440, id `ZSwmc`)

| Élément | Valeur maquette | Valeur code (`src/pages/blog/[slug].astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Hauteur du hero | `600px` (explicite sur `Hero #xt4Y8`) | `min-height: 26rem = 416px` | Article de blog | **bloquant** (−184 px) |
| Voile | `#08080ADB` → α **0.86** | `rgba(8, 8, 10, 0.82)` | Article de blog | cosmétique |
| Header dans le hero | `absolute`, padding `20px 48px` | `position: fixed` transparent, padding `1rem 3rem = 16px 48px` (chemin sur mesure) | Article de blog | **visible** |
| Gap du bloc héros | `16px` | `.hero-content { gap: .75rem = 12px }` | Article de blog | cosmétique |
| Padding du bloc héros | non défini explicitement (contenu `760px` centré) | `6rem 3rem 3rem = 96px 48px 48px` | Article de blog | incertitude 6.2 |
| Fil d'Ariane | « Blog  /  Migrer de Gatsby vers Astro », Barlow `12px`, `#93939C` | `<p class="breadcrumb">Blog / …</p>`, `0.75rem = 12px` ✓, `var(--color-ink-2)` ✓ | Article de blog | conforme |
| Ligne meta | pastille catégorie (`radius 999px`, padding `[5 14]`, label IBM Plex Mono `11px` `ls=1`) + date IBM Plex Mono `12px` + « · » + « 6 min de lecture » Barlow `12px`, **au-dessus du titre** | pastille (padding `.3rem .85rem = 4.8px 13.6px`, `0.7rem = 11.2px`) + date (`0.75rem = 12px`) **au-dessus** du titre, mais « 1 min de lecture » (`0.8rem = 12.8px`) **sous** le titre, **sans « · »** | Article de blog | **visible** (disposition) |
| Date | « 12 SEPT. 2026 » IBM Plex Mono `12px` | « 20 septembre 2026 » (`toLocaleDateString` long, Barlow `12px`) | Article de blog | **visible** (police + format) |
| Titre | Anton `44px`, `ls=0.5`, largeur `760px`, centré | `clamp(1.75rem, 4vw, 2.75rem)` → **44 px à 1440 px** ✓, pas de `letter-spacing`, `.hero-content { max-width: 48rem = 768px }` | Article de blog | cosmétique |
| Corps — padding | `40px 48px 80px` | `2.5rem 3rem 5rem = 40px 48px 80px` ✓ | Article de blog | conforme |
| Corps — largeur | `760px` | `.prose { max-width: 47.5rem = 760px }` ✓ | Article de blog | conforme |
| Paragraphes | Barlow `16px`, `lh 1.8`, `#93939C` | `16px` ✓, `line-height: 1.8` ✓, `var(--color-ink-2)` ✓ | Article de blog | conforme |
| H2 du corps | Anton `24px`, `#F2F1ED` | Anton `1.5em = 24px` ✓ (taille navigateur), `var(--color-ink)` ✓ | Article de blog | conforme |
| Bloc de code | en-tête 3 pastilles + « src/content.config.ts », fond `#0A0A0D`, `radius 12px` | Expressive Code `figure.frame` **sans titre** (`<figcaption class="header"></figcaption>` vide), fond `#0A0A0D` ✓, `radius 12px` ✓ via `.prose pre`, bordure `1px var(--color-hairline)` ✓ | Article de blog | **visible** (en-tête vide) |
| Image en ligne | `320px` de haut, `radius 12px` | aucune règle `.prose img` → largeur intrinsèque, pas de `border-radius` | Article de blog | **visible** |
| Tags | Barlow `12px`, `#93939C`, bordure `1px #26262D`, `radius 999px`, padding `[6 14]`, gap `10px`, marge haute `2.5rem` | ✓, ✓, ✓, ✓, `padding: .35rem .85rem = 5.6px 13.6px`, `gap: .6rem = 9.6px`, `margin: 2.5rem auto 0` ✓ | Article de blog | cosmétique |
| Prev / Next — disposition | 2 cartes `760px`, gap `20px`, sans filet au-dessus | `grid-template-columns: 1fr 1fr`, `gap: 1.25rem = 20px` ✓, `max-width: 47.5rem = 760px` ✓, **plus** `border-top: 1px solid var(--color-hairline)` + `padding-top: 1.5rem` absents de la maquette | Article de blog | cosmétique |
| Prev / Next — carte | padding `14px`, gap `14px`, vignette `56×56px` `radius 6px`, eyebrow IBM Plex Mono `10px` `ls=1`, titre Anton `14px` | `padding: .85rem = 13.6px`, `gap: .85rem = 13.6px`, vignette `56×56px` ✓ `radius 6px` ✓, eyebrow `0.7rem = 11.2px`, titre Anton `16px` (pas de `font-size`) | Article de blog | cosmétique |
| Eyebrow « SUIVANT → » | `#93939C` (ligne 505 de `docs/pen-spec.txt`) | `#E8352B` (`.eyebrow.accent`) | Article de blog | **visible** |

### 4.5 Écrans sans maquette

`/a-propos/` et `/contact/` n'ont **aucun écran de référence** dans le `.pen`
(12 écrans listés en 1.5). Elles utilisent `SiteLayout`, donc les écarts des sections 3.1,
3.3 et 3.4 (Header, Footer, Article Card) s'y appliquent, mais elles ne sont pas notées
par écran ici.

---

## 5. Écrans mobiles (390 px)

### 5.1 `Accueil (mobile)` (390, id `o1l4V`)

| Élément | Valeur maquette | Valeur code (`src/pages/index.astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Header | composant Mobile Header (voir 3.2) | idem 3.2 | Accueil (mobile) | **visible** |
| Hauteur du hero | `420px` | `min-height: 32rem = 512px` | Accueil (mobile) | **bloquant** (+92 px) |
| Padding du hero | `padding: [0 24]` | `.hero-content { padding: 2rem = 32px }` | Accueil (mobile) | **visible** |
| Titre | Anton `38px`, **deux lignes empilées** (`Title` en `layout=vertical`, gap `8px`) | `clamp(2.5rem, 6vw, 4.5rem)` → **40 px** à 390 px, les deux `<span>` restent sur **une seule ligne** | Accueil (mobile) | **visible** (structure) |
| Sous-titre | largeur `280px`, Barlow `12px`, `ls=1.5`, centré | `0.9rem = 14.4px`, `letter-spacing: .1em ≈ 1.44px`, pas de largeur contrainte | Accueil (mobile) | **visible** |
| CTA | padding `14px 24px`, libellé Barlow `14px` | `padding: .85rem 2.25rem = 13.6px 36px`, `0.9rem = 14.4px` | Accueil (mobile) | **visible** (largeur) |
| Section Features — padding | `48px 24px 32px` | `5rem 3rem 4rem = 80px 48px 64px` | Accueil (mobile) | **visible** (gouttières 48 vs 24 px) |
| Features — titre | Anton `24px`, centré | `1.75rem = 28px`, `text-align: center` ✓ | Accueil (mobile) | cosmétique |
| Features — sous-titre | Barlow `14px`, centré | `16px`, centré ✓ | Accueil (mobile) | cosmétique |
| Liste de cartes — retrait haut | `24px` | `margin-top: 2rem = 32px` | Accueil (mobile) | cosmétique |
| Cartes feature | 1 colonne, mêmes valeurs que desktop | `grid-template-columns: 1fr` ✓ (`@media (width<=60rem)`), mêmes écarts qu'en 4.1 | Accueil (mobile) | conforme (structure) |
| Panneaux | `padding: [0 24 32 24]`, 1 colonne | `padding: 0 3rem 5rem = 0 48px 80px`, 1 colonne ✓ | Accueil (mobile) | **visible** |
| « Derniers articles » | `padding: [16 24 48 24]`, gap `20px`, titre Anton `20px` | `padding: 0 3rem 5rem = 0 48px 80px`, `gap: 1.5rem = 24px`, titre `1.5rem = 24px` | Accueil (mobile) | **visible** (gouttières + titre) |
| Liste d'articles | 1 colonne, gap `20px` | 1 colonne ✓, `gap: 1.5rem = 24px` | Accueil (mobile) | cosmétique |
| Footer (maquette : variante mobile dédiée) | padding `40px 24px 28px`, gap `20px`, marque Anton `18px`, tagline Barlow `12px`, **4 liens** « Guides / Notes / Blog / Contact » Barlow `12px` gap `12px` `#CCCCCC`, séparateur `#3A3A3A`, copyright « © 2026 Demiton » Barlow `11px` `#777777` | composant unique **non responsive** : padding `48px 48px 28px`, gap `32px`, marque `22px`, tagline `12.8px`, **3 liens** « Docs / GitHub / Contact » `12.8px` gap `28px` `#93939C`, séparateur `#26262D`, copyright « © 2026 Demiton — propulsé par Astro + Starlight » `12px` `#93939C` | Accueil (mobile), Blog (mobile), Article de blog (mobile) | **visible** (libellés différents + 7 écarts de valeurs) |

### 5.2 `Page de documentation (mobile)` (390, id `UD04V`)

| Élément | Valeur maquette | Valeur code | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Boutons d'ouverture du menu | 1 bouton (`36×36px`) | **2 boutons de menu côte à côte** en dessous de 800 px (voir 3.2) | Page de documentation (mobile) | **bloquant** |
| Header | padding `16px 20px` | `12px 16px` (Starlight `--sl-nav-pad-y`/`--sl-nav-pad-x` < 50em) | Page de documentation (mobile) | **visible** |
| Fil d'Ariane | « Notes / Mémo Git », Barlow `12px`, `#93939C` | absent (cf. 4.2) | Page de documentation (mobile) | **bloquant** |
| Padding du contenu | `24px 20px 40px`, gap `16px` | `.content-panel { padding: 1.5rem 1rem } = 24px 16px`, `--sl-content-gap-y: 1rem = 16px` ✓ | Page de documentation (mobile) | cosmétique |
| Titre de page | Anton `30px` | Anton `--sl-text-h1 = --sl-text-4xl = 2.1875rem = 35px` (< 50em) | Page de documentation (mobile) | **visible** (+5 px) |
| Intro | Barlow `14px`, `lh 1.7` | `16px`, `--sl-line-height: 1.75` | Page de documentation (mobile) | cosmétique |
| Barre « Sommaire de la page » | fond `#0B0B0E`, bordure `1px #26262D`, `radius 8px`, padding `[12 16]`, icône `list` `16px` `#E8352B`, label Barlow `13px` poids `500`, chevron `16px` `#93939C` | `<mobile-starlight-toc>` : résumé « Sur cette page » (`--sl-mobile-toc-height: 3rem`), pas de fond/bordure/rayon explicites, pas d'icône `list`, libellé `16px`, chevron `caret` | Page de documentation (mobile) | **visible** |
| Titres H2 | Anton `20px` | Anton `--sl-text-h2 = --sl-text-3xl = 1.8125rem = 29px` | Page de documentation (mobile) | **visible** (+9 px) |
| Bloc de code | fond `#0A0A0D`, `radius 12px`, IBM Plex Mono `12px`, en-tête 3 pastilles + « terminal — bash » | fond ✓, `radius 0px + 1px`, `14px`, cadre terminal sans pastille ni titre | Page de documentation (mobile) | **visible** |
| Prev / Next | 2 cartes **empilées**, gap `12px`, fond `#0B0B0E`, bordure `1px #26262D`, `radius 8px`, padding `14px`, eyebrow IBM Plex Mono `10px`, titre Anton `15px` | grille `repeat(auto-fit, minmax(min(18rem,100%),1fr))` → **1 colonne** sous 18 rem, fond transparent, bordure `#35353D`, ombre, libellé `16px` + icône `24px`, titre `24px` | Page de documentation (mobile) | **visible** |
| Footer | le `.pen` réutilise le `ref` **`Footer` desktop** (`padding [64 48 32 48]`) et non la variante mobile | footer desktop non responsive | incertitude 6.3 | — |

### 5.3 `Blog (mobile)` (390, id `QqH73`)

| Élément | Valeur maquette | Valeur code (`src/pages/blog/index.astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| Header | Mobile Header | idem 3.2 | Blog (mobile) | **visible** |
| Bandeau de titre — padding | `36px 24px 28px`, gap `8px` | `4rem 3rem 3rem = 64px 48px 48px`, `gap: .5rem = 8px` ✓ | Blog (mobile) | **visible** |
| Bandeau — H1 | Anton `32px` | `2.5rem = 40px` | Blog (mobile) | **visible** |
| Bandeau — sous-titre | Barlow `13px`, largeur `280px`, centré | `16px`, pas de largeur, centré ✓ | Blog (mobile) | **visible** |
| Featured — retrait | `padding: 24px 20px 0` | `2.5rem 3rem 0 = 40px 48px 0` | Blog (mobile) | **visible** |
| Featured — couverture | `180px` | `200px` (`@media (width<=60rem)`) | Blog (mobile) | **visible** |
| Featured — corps | padding `24px`, gap `12px` | `2.5rem = 40px`, `gap: 1rem = 16px` | Blog (mobile) | **visible** |
| Featured — titre | Anton `22px` | `1.75rem = 28px` | Blog (mobile) | **visible** |
| Featured — extrait | Barlow `13px`, `lh 1.6` | `16px`, `lh 1.7` | Blog (mobile) | **visible** |
| Featured — bouton | padding `10px 24px`, libellé `13px` | `11.2px 28px`, `14px` | Blog (mobile) | cosmétique |
| Liste — padding | `32px 20px`, gap `24px` | `2.5rem 3rem 5rem = 40px 48px 80px`, `gap: 2.5rem = 40px` | Blog (mobile) | **visible** |
| Liste — titre de section | Anton `20px` | `1.375rem = 22px` | Blog (mobile) | cosmétique |
| Grille d'articles | 1 colonne, gap `20px` | 1 colonne ✓ (`@media (width<=60rem)`), `gap: 1.5rem = 24px` | Blog (mobile) | cosmétique |
| Sidebar — retrait | `padding: 0 20px 32px`, gap `28px` | `padding: 2.5rem 3rem 5rem = 40px 48px 80px`, `gap: 2.5rem = 40px` | Blog (mobile) | **visible** |
| Nuage de tags | 3 rangées de pastilles | `flex-wrap` libre | Blog (mobile) | cosmétique |
| Pagination | `←` / `1 2 3` (`32×32px`) / `→`, padding `0 20px 48px`, gap `10px` | **absente** | Blog (mobile) | **bloquant** |
| Footer | variante mobile dédiée (cf. 5.1) | footer desktop non responsive | Blog (mobile) | **visible** |

### 5.4 `Article de blog (mobile)` (390, id `Vv1lr`)

| Élément | Valeur maquette | Valeur code (`src/pages/blog/[slug].astro`) | Écran(s) | Gravité |
| --- | --- | --- | --- | --- |
| **Structure de l'en-tête** | bloc **solide** `#16161B` + filet bas `1px #26262D`, padding `28px 20px 24px` (fil d'Ariane, meta, titre, temps de lecture), **puis** image de couverture `200px` `radius 10px` dans un bloc `padding: [20 20 0 20]` | **hero plein cadre** `min-height: 26rem = 416px` avec `background-image` + overlay `rgba(8,8,10,0.82)`, contenu centré, padding `6rem 3rem 3rem` | Article de blog (mobile) | **bloquant** (structure différente) |
| Fil d'Ariane | Barlow `11px` | `0.75rem = 12px` | Article de blog (mobile) | cosmétique |
| Ligne meta | pastille padding `[4 12]`, label IBM Plex Mono `10px`, date IBM Plex Mono `11px`, gap `10px` | pastille padding `4.8px 13.6px`, label `11.2px`, date `12px`, `gap: .875rem = 14px` | Article de blog (mobile) | cosmétique |
| Titre | Anton `28px` | `clamp(1.75rem, 4vw, 2.75rem)` → **28 px** à 390 px ✓ | Article de blog (mobile) | conforme |
| Temps de lecture | Barlow `12px` | `0.8rem = 12.8px` | Article de blog (mobile) | cosmétique |
| Corps — padding | `24px 20px 40px`, gap `20px` | `2.5rem 3rem 5rem = 40px 48px 80px` (le gap n'est pas défini sur `.body-wrap`) | Article de blog (mobile) | **visible** |
| Paragraphes | Barlow `14px`, `lh 1.8` | `16px`, `lh 1.8` ✓ | Article de blog (mobile) | **visible** |
| H2 du corps | Anton `20px` | Anton `1.5em = 24px` | Article de blog (mobile) | **visible** |
| Bloc de code | IBM Plex Mono `12px`, `radius 12px`, en-tête 3 pastilles + nom de fichier | `14px`, `radius 12px` ✓ via `.prose pre`, `figcaption` vide, pas de pastilles | Article de blog (mobile) | **visible** |
| Image en ligne | `180px`, `radius 10px` | pas de règle `.prose img` | Article de blog (mobile) | **visible** |
| Tags | `padding: [6 14]`, gap `10px`, Barlow `12px` | `5.6px 13.6px`, `gap: 9.6px`, `12px` ✓ | Article de blog (mobile) | cosmétique |
| Prev / Next | **empilées**, gap `12px`, cartes padding `12px`, gap `12px`, vignette `48×48px` `radius 6px`, eyebrow IBM Plex Mono `9px`, titre Anton `13px` | `grid-template-columns: 1fr` seulement sous `40rem` ✓, `gap: 1.25rem = 20px`, `padding: .85rem = 13.6px`, `gap: 13.6px`, vignette `56×56px`, eyebrow `11.2px` + icône, titre `16px` | Article de blog (mobile) | **visible** |
| Footer | le `.pen` réutilise le `ref` **`Footer` desktop** | footer desktop non responsive | incertitude 6.3 | — |

---

## 6. Incertitudes explicites (non inventées)

1. **Largeur des cartes d'article.** Le composant `Article Card` déclare `340px`, mais les
   instances dans les rangées portent `width: fill_container` (`docs/pen-spec.txt`, lignes 64,
   75, 86, 97…). Impossible de trancher entre « carte fixe à 340 px » et « carte étirée ».
   Le code étire (`1fr`) : 432 px sur l'accueil, 490 px sur le blog à 1440 px.
2. **Padding du bloc `hero-content` de l'Article de blog (desktop).** Le `.pen` ne définit
   qu'un `gap: 16px` et une largeur de contenu `760px`, sans padding explicite ; le code
   applique `6rem 3rem 3rem`. Aucune valeur de maquette à comparer.
3. **`ref "Footer"` cassé dans `Page de documentation`.** Ligne 231 de `docs/pen-spec.txt` :
   `ref "Footer" … REF->Header`. Le bas de cet écran n'est pas un footer de référence.
   De plus, les écrans `Page de documentation (mobile)` et `Article de blog (mobile)`
   instancient le `ref` **Footer desktop** et non la variante mobile : ces deux écrans mobiles
   ne permettent donc pas d'auditer le footer mobile.
4. **Hauteurs.** Aucun écran du `.pen` n'a de hauteur ; seules les hauteurs explicites des
   enfants (`Hero 800px`/`420px`/`600px`, `Cover 190px`/`340px`/`180px`/`200px`,
   `Icon circle 72px`, `Menu button 36px`, `Thumb 56px`/`48px`) sont comparables. Les hauteurs
   « code » estimées (ex. header ≈ 56 px) sont des **calculs**, pas des mesures navigateur.
5. **Header `absolute` dans le hero de l'Accueil.** Le `.pen` pose le header dans le hero ;
   le code le passe en `position: fixed` et l'opacifie après 40 px de défilement
   (`SiteLayout.astro`). Ce comportement n'est pas représentable dans la maquette : ni écart
   ni conformité.
6. **Non mesuré dans cette passe.** Le débordement potentiel du footer (`width: 100vw` +
   `margin-inline: -50vw`) et l'effet réel de `font-weight: 600/700` sur Anton (police à
   graisse unique) n'ont pas pu être vérifiés : aucun navigateur n'était installé lors de
   la rédaction.

### 6.1 Vérification ultérieure en navigateur headless

Chromium headless a depuis été installé hors du dépôt (`../.tools/` et `../.browsers/`) et
le double bouton mobile a été mesuré sur le site buildé, en 390×844, page
`/guides/bien-demarrer/` :

| Élément | Position | Taille | `border-radius` |
| --- | --- | --- | --- |
| `.menu-toggle` (SiteHeader) | `x=290, y=10` | `36×36` | `8px` |
| `.sl-menu-button` (Starlight) | `x=342, y=12` | `32×32` | `50%` |

Les deux boutons **ne se chevauchent pas** (`ox = 0`) : ils sont adjacents et tous deux
cliquables, chacun ouvrant une navigation différente. Le terme « superposés » employé
plus haut dans ce rapport était donc impropre — le défaut tient à la coexistence de deux
boutons, pas à un recouvrement. C'est cette formulation qui fait foi.

---

## 7. Corrections ordonnées — DESKTOP

Du plus impactant au plus mineur. Les valeurs cibles sont celles de la maquette.

1. **Accueil — hauteur du hero : `512px` → `800px`** (`min-height: 32rem` → `50rem`), voile
   `rgba(8,8,10,.85)` → `#08080ACC`, et `gap` du `hero-content` `16px` → `28px`.
2. **Page de documentation — ajouter le fil d'Ariane** « Notes / Mémo Git » (Barlow `12px`,
   `#93939C`) : totalement absent du rendu Starlight.
3. **Blog — ajouter la pagination** : `← Précédent`, pastilles `36×36px` (page active fond
   `#E8352B`, autres fond `#16161B` + bordure `1px #26262D`), `Suivant →`, conteneur
   `padding: 0 48px 80px`, `gap: 12px`, libellés Barlow `14px`. Absente de `dist/blog/index.html`.
4. **Header — unifier les deux chemins et la maquette** : padding `20px 48px` partout
   (aujourd'hui `16px 48px` sur mesure, `12px 24px` Starlight), marque Anton `22px`
   (aujourd'hui `20px`), liens poids `400` hors « Blog » (aujourd'hui `500`).
5. **Article de blog — hauteur du hero : `416px` → `600px`** (`min-height: 26rem` → `37.5rem`),
   voile α `0.82` → `0.86`.
6. **Page de documentation — échelle des titres** : H2 Anton `35px` → `24px`
   (`--sl-text-h2` en `1.5rem`), H1 `42px` → `40px`, titre de page mobile `35px` → `30px`.
7. **Page de documentation — géométrie doc** : sidebar `300px` → `272px`, TOC `300px` → `208px`,
   padding sidebar et TOC `16px` → `28px`, contenu utile `672px` → `848px`
   (`--sl-content-width: 45rem` → `53rem`, `--sl-content-pad-x` → `56px`).
8. **Page de documentation — sidebar** : libellés de section Anton `12px` `ls 1.5px` `#93939C`
   en capitales (aujourd'hui Barlow `18px` `#F2F1ED`), items `radius 999px` + `padding 8px 12px`
   (aujourd'hui `4px` / `4.2px 8px`), item actif fond `#2A1416` + texte `#E8352B` + pastille
   `7×7px` (aujourd'hui fond `#E8352B` plein + texte `#2A1416`, sans pastille).
9. **Blog — bandeau et featured** : `title-section` `64px` → `80px` de padding haut et H1
   `40px` → `48px` ; `featured-wrap` `40px 48px 0` → `48px 48px 0` ; carte featured
   `radius 8px` → `12px`, corps `40px` → `48px`, titre `28px` → `32px` ; `body-grid`
   padding haut `40px` → `24px`.
10. **Page de documentation — encadré « Astuce »** : bordure gauche `#6B4CE6` → `#35D6D6`,
    supprimer le fond `--sl-color-purple-low`, `border-radius: 0` → `12px`, titre Barlow `18px`
    → Anton `13px` `#F2F1ED`, icône `18px` `#35D6D6`.
11. **Blocs de code (doc + article)** : `radius` `1px` → `12px`, bordure `#3C3F51` → `#26262D`
    (ou suppression), en-tête avec 3 pastilles `10×10px` (`#E8352B`/`#F5B400`/`#35D6D6`) et nom
    de fichier IBM Plex Mono `11px` `#999999`, police `14px` → `13px`, palette Dracula
    (`#50FA7B`, `#F8F8F2`, `#F1FA8C`, `#BD93F9`, `#96A1C2`) → `#4CD3E3` / `#777777` / `#F8B600`.
12. **Page de documentation — cartes prev/next** : fond `#16161B`, bordure `#26262D`, retirer
    `--sl-shadow-md`, eyebrow IBM Plex Mono `11px` `ls 1px` (aujourd'hui label Barlow `16px` +
    icône `24px`), titre Anton `16px` (aujourd'hui `24px`).
13. **Accueil — rythme des sections** : Features `80px 48px 64px` → `100px 48px 80px`,
    titre `28px` → `36px`, `margin-top` de la grille `32px` → `48px`, largeur max `1120px` →
    `1344px` ; Panneaux `0 48px 80px` → `40px 48px 100px` ; Derniers articles
    `0 48px 80px`/gap `24px` → `40px 48px 100px`/gap `32px`, titre `24px` → `28px`.
14. **Accueil — héros** : sous-titre `14.4px`/`ls 1.44px` → `16px`/`ls 2px` ; CTA
    `13.6px 36px`/`14.4px` → `14px 40px`/`15px`.
15. **Article de blog — ligne meta** : déplacer « X min de lecture » au-dessus du titre, dans la
    ligne meta, avec le séparateur « · » ; date « 20 septembre 2026 » → « 12 SEPT. 2026 »
    (IBM Plex Mono `12px`, majuscules, mois abrégé avec point) ; eyebrow « SUIVANT → »
    `#E8352B` → `#93939C` ; titre des cartes prev/next `16px` → `14px` ; retirer
    `border-top`/`padding-top` ajoutés sur `.prev-next`.
16. **Blog — sidebar** : titres de widget Anton `13px` `ls 1.5px` en capitales (aujourd'hui
    `12.8px` `ls 0.1em` casse normale) ; compteurs IBM Plex Mono `11px` avec la couleur de la
    catégorie (`#E8352B`, `#35D6D6`, `#6B4CE6`, `#F5B400`) au lieu de la couleur héritée.
17. **Footer desktop** : padding `48px 48px 28px` → `64px 48px 32px` ; liens `#93939C` →
    `#CCCCCC` ; séparateur `#26262D` → `#3A3A3A` ; copyright `#93939C` → `#777777` et
    « Propulsé » (capitale) ; marque `#F2F1ED` → `#FFFFFF`.
18. **Cartes d'article** : catégorie en capitales (« ASTRO » et non « Astro »),
    `letter-spacing` `0.52px` → `1px`, titre poids `400` → `600`.
19. **Recherche du header** : libellé unique « Rechercher…  Ctrl K » Barlow `13px` (aujourd'hui
    « Rechercher » `14px` + badges `<kbd>` `12px`), icône `16px` → `14px`, hauteur `40px` →
    ≈ `36px` (`padding: 8px 14px`).
20. **Cosmétiques restants** : gap du corps de carte `9.6px` → `10px` ; padding de la pastille
    catégorie `9.6px` → `10px` ; CTA `13.6px 36px` → `14px 40px` ; bouton featured
    `11.2px 28px` → `12px 32px` ; points des dates (« 20 SEPT » → « 20 SEPT. »).

## 8. Corrections ordonnées — MOBILE

1. **Supprimer le double bouton d'ouverture du menu sur `/guides/*` et `/notes/*` en dessous de
   800 px** : masquer ou retirer le `sl-menu-button` de Starlight (bouton rond blanc `32px`,
   `position: fixed`, `top: 12px`) pour ne garder que le `.menu-toggle` du `SiteHeader`
   (`36×36px`). C'est le seul écart fonctionnel du site.
2. **Article de blog (mobile) — structure** : remplacer le hero plein cadre `416px` + overlay
   par un bloc d'en-tête solide (`#16161B`, filet bas `1px #26262D`, padding `28px 20px 24px`)
   contenant fil d'Ariane / meta / titre / temps de lecture, suivi de la couverture `200px`
   `radius 10px` dans un bloc `padding: 20px 20px 0`.
3. **Rétablir les gouttières mobiles de 24 px / 20 px** au lieu de `48px` partout :
   `features` `48px 24px 32px`, `panels` `0 24px 32px`, `latest` `16px 24px 48px`,
   blog `title-section` `36px 24px 28px`, `featured-wrap` `24px 20px 0`,
   `body-grid` `32px 20px` + sidebar `0 20px 32px`, hero et `body-wrap` d'article
   `20px` de chaque côté.
4. **Accueil (mobile) — hero** : hauteur `512px` → `420px` ; titre Anton `40px` sur une ligne →
   `38px` sur **deux lignes** (« DEMITON » / « DOCS », gap `8px`) ; sous-titre `14.4px` →
   `12px` `ls 1.5px` sur `280px` de large ; CTA `13.6px 36px`/`14.4px` → `14px 24px`/`14px`.
5. **Mobile Header** : padding `13.6px 20px` (sur mesure) et `12px 16px` (Starlight) →
   `16px 20px` ; marque Anton `20px` → `18px` ; retirer la bordure `1px #26262D` du bouton
   menu ; icône `20px` → `18px`.
6. **Footer mobile** : padding `48px 48px 28px` → `40px 24px 28px` ; gap `32px` → `20px` ;
   marque `22px` → `18px` ; tagline `12.8px` → `12px` ; liens `12.8px` gap `28px` →
   `12px` gap `12px` **et libellés « Guides / Notes / Blog / Contact »** (aujourd'hui
   « Docs / GitHub / Contact ») ; séparateur `#26262D` → `#3A3A3A` ; copyright `12px`
   « © 2026 Demiton — propulsé par Astro + Starlight » → `11px` « © 2026 Demiton », `#777777`.
7. **Blog (mobile)** : H1 `40px` → `32px` ; couverture featured `200px` → `180px` ; corps
   featured `40px`/`16px` → `24px`/`12px` ; titre featured `28px` → `22px` ; extrait `16px`
   `lh 1.7` → `13px` `lh 1.6` ; `list-wrap` `40px 48px 80px`/gap `40px` → `32px 20px`/gap
   `24px` ; titre de section `22px` → `20px` ; bouton `11.2px 28px` → `10px 24px`.
8. **Ajouter la pagination mobile au blog** : `←` / pastilles `32×32px` / `→`,
   `padding: 0 20px 48px`, `gap: 10px`.
9. **Page de documentation (mobile)** : titre Anton `35px` → `30px` ; H2 Anton `29px` → `20px` ;
   remplacer le résumé « Sur cette page » de `<mobile-starlight-toc>` par la barre
   « Sommaire de la page » (fond `#0B0B0E`, bordure `1px #26262D`, `radius 8px`,
   padding `12px 16px`, icône `list` `16px` `#E8352B`, label Barlow `13px` poids `500`,
   chevron `16px` `#93939C`) ; contenu `padding: 24px 20px 40px` ; fil d'Ariane à ajouter.
10. **Prev / Next mobiles (doc et article)** : empiler, gap `12px`, cartes fond
    `#16161B` (article) ou `#0B0B0E` (doc), bordure `#26262D`, `radius 8px`, padding `14px`
    (doc) / `12px` (article), vignette `48×48px` `radius 6px`, eyebrow IBM Plex Mono `9px`,
    titre Anton `13px` (article) / `15px` (doc), retirer l'ombre et l'icône `24px`.
11. **Article (mobile) — corps** : `body-wrap` `40px 48px 80px` → `24px 20px 40px` gap `20px` ;
    paragraphes `16px` → `14px` ; H2 Anton `24px` → `20px` ; bloc de code `14px` → `12px` ;
    image en ligne `180px` `radius 10px`.
12. **Cartes d'article (mobile)** : gap de liste `24px` → `20px` ; tags `5.6px 13.6px` →
    `6px 14px`, gap `9.6px` → `10px` ; même correctif de capitales de catégorie que desktop.
