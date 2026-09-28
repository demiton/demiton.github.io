---
title: Migrer de Gatsby vers Astro
description: Pourquoi ce site quitte Gatsby pour Astro + Starlight, et ce que ça change concrètement.
date: 2026-09-20
category: Astro
tags: [astro, starlight, migration]
cover: https://images.unsplash.com/photo-1649451844924-0d7a218e02c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080
---

Ce site tournait sur Gatsby depuis ses débuts, avec une admin Decap (ex-Netlify) CMS qui passait par un endpoint OAuth hébergé sur Vercel. Le montage fonctionnait, mais il portait trois couches à maintenir pour ce qui reste un simple site de documentation : Gatsby et son GraphQL, l'admin CMS, et le service OAuth externe.

## Ce qui a motivé le changement

- **Un site de doc n'a pas besoin de GraphQL.** Toutes les requêtes de contenu de Gatsby servaient au final à afficher... du Markdown. Les collections de contenu d'Astro font la même chose avec un schéma Zod typé, validé au build, sans couche de requête intermédiaire.
- **Starlight fait déjà le travail d'un thème de doc.** Sidebar générée automatiquement depuis l'arborescence des fichiers, recherche Pagefind intégrée, table des matières, navigation précédent/suivant : autant de choses qu'il fallait recoder ou brancher à la main côté Gatsby.
- **Une dépendance externe en moins.** L'admin Decap et son endpoint OAuth sur Vercel disparaissent : le contenu s'édite directement en Markdown dans le dépôt, sans service tiers à maintenir.

## Ce qui a changé concrètement

Le dossier `static/admin/` et la config Gatsby ont été supprimés. Le contenu vit maintenant dans `src/content/docs/`, chargé via `docsLoader()`/`docsSchema()` dans `src/content.config.ts`. La navigation `Guides` / `Notes` se configure en quelques lignes dans `astro.config.mjs`, en `autogenerate` sur les dossiers correspondants — ajouter une page revient à ajouter un fichier.

Comme il s'agit d'un dépôt `<user>.github.io`, `site` vaut `https://demiton.github.io` et aucun `base` n'est nécessaire : les URLs restent simples.

## Et la suite

Le déploiement utilisait encore une action GitHub taillée pour Gatsby ; ce chantier en a profité pour la remplacer par un workflow GitHub Pages natif pour Astro. Le thème visuel a lui aussi été repensé à cette occasion — c'est le sujet du [prochain article](/blog/theme-akira-neo-tokyo/).
