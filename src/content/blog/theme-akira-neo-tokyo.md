---
title: Un thème Akira pour la doc
description: Comment ce site est passé d'un thème clair et pastel à un dark éditorial inspiré de Neo-Tokyo.
date: 2026-09-27
category: Design
tags: [design, css, akira]
cover: https://images.unsplash.com/photo-1642466043595-431ddf3c607e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080
---

Le thème d'origine du site — fond clair, corail/cyan/jaune — a servi de base honnête pendant la migration vers Astro, mais il ne correspondait pas vraiment à l'ambiance recherchée. Le nouveau thème s'inspire de l'esthétique Akira / Neo-Tokyo : fonds quasi noirs, rouge Kaneda en accent principal, cyan électrique et jaune danger en accents secondaires.

## Une maquette avant le code

Avant de toucher au CSS réel, la refonte a été dessinée dans une maquette (`design/pencil-demiton.pen`) : accueil, page de documentation, blog et page d'article, en desktop et en mobile. Ça a permis de trancher les questions de structure — l'entrée « Blog » dans le header, les widgets catégories/tags du blog, la navigation article précédent/suivant — avant d'écrire la moindre ligne de composant Astro.

## Les choix retenus

- **Un seul thème.** Plutôt que de maintenir une variante claire ET une variante sombre de la palette Akira, le site n'a plus qu'un thème : le sélecteur clair/sombre de Starlight a été retiré.
- **Une palette dosée.** Rouge `#E8352B`, cyan `#35D6D6`, jaune `#F5B400`, violet `#6B4CE6` en accent ponctuel — mais pas de grain, de glitch ni de scanlines : la doc reste confortable à lire sur de longues pages techniques.
- **Anton pour les titres, Barlow pour le texte courant.** Anton apporte le côté affiche condensée propre à l'esthétique recherchée ; Barlow garde les paragraphes lisibles. IBM Plex Mono reste inchangé pour le code, déjà cohérent avec l'ambiance « terminal ».
- **Des badges plutôt que des ronds pleins.** Les icônes (guides, notes, recherche) sont passées de ronds de couleur pleine avec icône blanche à des badges contourés sur fond quasi noir, plus proches d'une interface technique que d'un pictogramme grand public.

## Ce que ça donne dans le code

Toutes les couleurs et polices sont centralisées dans `src/styles/custom.css`, à la fois comme variables `--sl-color-*` pour habiller Starlight et comme tokens génériques (`--color-accent`, `--font-display`...) réutilisés par les composants Astro sur-mesure du site (header, footer, cartes d'article).
