# Contribuer

Merci de l'intérêt porté au site. Ce document décrit comment proposer une
modification, que ce soit une correction, un nouvel article ou une évolution du
design.

Pour comprendre l'architecture du dépôt, lire d'abord [`AGENTS.md`](./AGENTS.md).

## Prérequis

- **Node ≥ 22.12** (imposé par Astro 7). `node --version` pour vérifier.
- `git`.

## Installation

```bash
git clone https://github.com/demiton/demiton.github.io.git
cd demiton.github.io
npm install
npm run dev        # http://localhost:4321
```

## Commandes utiles

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Build de production dans `./dist/` |
| `npm run preview` | Sert le build de production |
| `npx astro check` | Vérification de types des fichiers `.astro` et TS |

## Workflow Git

**Aucun commit direct sur `main`** : `main` est déployée automatiquement en
production. Toute modification passe par une branche et une Pull Request.

```bash
git checkout main && git pull
git checkout -b fix/titre-page-accueil
# … modifications …
git add -A && git commit
git push -u origin fix/titre-page-accueil
```

### Nommage des branches

| Préfixe | Usage |
| --- | --- |
| `feat/` | Nouvelle fonctionnalité ou nouvelle page |
| `fix/` | Correction de bug |
| `content/` | Ajout ou modification de contenu rédactionnel |
| `design/` | Évolution de la maquette et du thème visuel |
| `chore/` | Outillage, dépendances, configuration |

### Messages de commit

En français, à l'impératif, sur le modèle `<type>: <résumé>` — les mêmes types que
les branches (`fix:`, `feat:`, `content:`, `design:`, `chore:`). Le corps du
message explique le **pourquoi** du changement, pas le comment.

```
fix: corrige le titre de l'accueil et les dépréciations Astro

Le titre était doublement échappé car la page passait une entité HTML
en prop, qu'Astro ré-échappait au rendu.
```

## Ajouter un article de blog

Créer un fichier `.md` dans `src/content/blog/`. Le nom du fichier devient l'URL :
`mon-article.md` → `/blog/mon-article/`.

```markdown
---
title: Un titre clair
description: Une phrase de résumé, reprise dans les listes et les résultats de recherche.
date: 2026-01-15
category: Linux
tags: [docker, réseau]
cover: /covers/mon-article.svg
draft: false
---

Le contenu, en Markdown.
```

| Champ | Requis | Notes |
| --- | --- | --- |
| `title` | oui | Titre affiché et utilisé dans l'onglet |
| `description` | oui | Résumé affiché sur les cartes |
| `date` | oui | Format `AAAA-MM-JJ` |
| `category` | oui | Une seule valeur, affichée en pastille |
| `cover` | oui | Chemin dans `public/covers/` ou URL absolue |
| `tags` | non | Liste, affichée en bas d'article |
| `draft` | non | `true` retire l'article des listes **et** des routes |

L'image de couverture va dans `public/covers/` (fichier servi tel quel) si elle est
versionnée, sinon une URL externe est acceptée.

## Ajouter une page de documentation

Déposer un `.md` dans `src/content/docs/guides/` ou `src/content/docs/notes/`.
La sidebar étant en `autogenerate`, la page y apparaît sans autre intervention.

```markdown
---
title: Installer Docker sur Debian
description: Installation pas à pas, du dépôt officiel jusqu'au premier conteneur.
---

Le contenu, en Markdown.
```

## Faire évoluer le design

La maquette `design/pencil-demiton.pen` et le code sont **deux représentations
d'une même vérité**. Toute évolution visuelle doit être répercutée des deux côtés.

1. Modifier la maquette (JSON en clair, 12 écrans desktop et mobile).
2. Répercuter dans `src/styles/custom.css` en priorité : les tokens `--color-*` et
   `--font-*` y sont l'unique source de vérité, et sont projetés sur les variables
   Starlight (`--sl-color-*`).
3. N'ajouter de CSS local dans un composant que si la valeur n'a pas vocation à
   être réutilisée.
4. Vérifier le rendu sur les **deux chemins de rendu** : les pages sur mesure
   (`SiteLayout`) et les pages de documentation (layout Starlight).

## Checklist avant d'ouvrir une Pull Request

- [ ] `npm run build` passe.
- [ ] `npx astro check` sort **0 erreur et 0 warning**.
- [ ] Le rendu a été vérifié en mobile (≤ 50 rem) et en desktop.
- [ ] Les liens internes ajoutés pointent vers une route qui existe.
- [ ] Si le design a changé, la maquette `.pen` et `custom.css` sont cohérentes.
- [ ] La Pull Request décrit le changement et, si pertinent, inclut une capture.

La CI rejoue `astro check` et le build sur chaque Pull Request ; une PR rouge
n'est pas fusionnée.

## Déploiement

Après fusion sur `main`, le workflow `.github/workflows/deploy.yml` construit le
site et le publie sur GitHub Pages. Le déploiement prend une à deux minutes.
Aucune action manuelle n'est nécessaire.
