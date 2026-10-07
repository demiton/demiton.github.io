---
title: "Quand l'IA conçoit le médicament"
description: "Un candidat dont la cible et la molécule sortent d'un modèle, des miniprotéines dessinées de novo, des organoïdes humains greffés chez la souris : en septembre 2026, l'IA cesse de lire les données et commence à proposer des molécules. Attention, l'essai phare porte sur 42 patients."
date: 2026-10-07
category: Biotechnologies
tags: [ia, biotechnologies, médicament, protéines, essai clinique]
cover: /covers/ia-medicament.svg
---

Jusqu'ici, l'intelligence artificielle en médecine servait surtout à lire : des images, des dossiers, des séquences. En septembre 2026, deux publications décrivent autre chose. Dans *Nature Biotechnology*, un candidat médicament dont la cible biologique et la molécule ont été trouvées par des modèles voit son effet mesuré chez des patients. Dans *Nature*, des protéines qui n'existent pas dans la nature sont dessinées sur ordinateur pour bloquer des récepteurs impliqués dans le cancer et les infections virales. L'IA ne classe plus des données : elle propose des molécules.

## L'essentiel

- Le **rentosertib** d'Insilico Medicine, candidat de première classe contre la fibrose pulmonaire idiopathique, fait l'objet d'une analyse protéomique publiée dans *Nature Biotechnology* : six horloges protéomiques indépendantes y mesurent une inversion de l'âge biologique prédit de **3 à 4 ans**, jusqu'à 6 ans sur l'une d'elles.[^1]
- **L'essai porte sur 42 patients, en phase IIa : ce n'est pas un traitement validé**, et l'effet mesuré est une prédiction statistique, pas une guérison constatée.
- Sa **molécule et sa cible** ont toutes deux été trouvées par IA : ce n'est pas le repositionnement d'une molécule déjà connue.
- Des **miniprotéines** conçues de novo bloquent les récepteurs CXCR4 et CCR5 — travaux de l'IIT Kanpur et du laboratoire de David Baker, publiés dans *Nature*.[^2]
- Des **organoïdes cérébraux humains** greffés chez la souris forment des réseaux neuronaux fonctionnels, également dans *Nature*.[^3]

## Un candidat dont la cible et la molécule sortent d'un modèle

Mettre un médicament au point demande deux choses : une **cible** — le mécanisme biologique que l'on veut corriger — et une **molécule** capable d'agir dessus. Pendant des décennies, les deux se trouvaient au laboratoire, par tâtonnement et par criblage. Le rentosertib inverse l'ordre : la cible et la molécule ont été proposées par des modèles, puis vérifiées à la paillasse.

Le candidat vise la fibrose pulmonaire idiopathique, une maladie où les poumons se cicatrisent progressivement et perdent leur capacité à échanger l'oxygène. Il est dit « de première classe » : aucune molécule de sa famille n'est déjà commercialisée pour cette indication. L'étude publiée porte sur un essai de **phase IIa** mené sur **42 patients**.

> **En clair**
> Un essai de **phase IIa** évalue pour la première fois l'efficacité d'un candidat sur un petit nombre de patients, après les essais de tolérance de la phase I. 42 patients, c'est un signal : il faut ensuite des essais plus larges, sur plus longtemps, pour parler de traitement.

La mesure qui a retenu l'attention n'est pas une mesure clinique classique. Les chercheurs ont analysé les profils **protéomiques** du sérum des patients — l'ensemble des protéines présentes dans un échantillon de sang, qui donne une photographie de l'état de l'organisme. Six **horloges protéomiques** du vieillissement, développées indépendamment les unes des autres, ont toutes indiqué la même direction : une inversion de l'âge biologique prédit, avec un effet maximal à la semaine 4 chez les patients recevant 30 mg deux fois par jour. L'ampleur va de 3 à 4 ans, jusqu'à 6 ans sur l'une des horloges. La capacité vitale forcée — le volume d'air qu'un patient parvient à expirer de force — montre une inversion dose-dépendante par rapport au placebo.

> **En clair**
> Une **horloge protéomique** est un modèle statistique qui estime un âge biologique à partir d'un profil de protéines. « Inverser l'âge biologique prédit » ne signifie donc pas rajeunir : cela veut dire que le sang du patient ressemble davantage, dans le modèle, à celui d'une personne plus jeune. C'est une prédiction, pas une mesure.

**Ce résultat n'est pas un traitement validé.** Il porte sur 42 patients, à un stade précoce d'évaluation, et son critère le plus spectaculaire est une estimation produite par des modèles — y compris lorsque ces modèles sont indépendants les uns des autres. Ce que l'essai suggère, c'est qu'une molécule conçue par IA peut atteindre sa cible chez l'humain et produire un signal mesurable. Ce qu'il ne dit pas, c'est qu'elle soigne.

## Concevoir la molécule au lieu de la chercher

Le deuxième résultat déplace le curseur encore en amont. Des chercheurs de l'IIT Kanpur, avec le laboratoire de David Baker — prix Nobel de chimie 2024 —, ont conçu de novo des **miniprotéines** capables de se fixer sur des **récepteurs couplés aux protéines G**, ou GPCR, et publié leurs travaux dans *Nature*.[^2] Deux d'entre eux sont particulièrement suivis : CXCR4 et CCR5, étudiés dans le cancer et dans les infections virales. La cryo-microscopie électronique de l'IIT Kanpur a permis de visualiser la liaison au récepteur CXCR4. Les auteurs le précisent eux-mêmes : ces protéines ne sont pas encore des médicaments.

> **En clair**
> Une **miniprotéine** est une protéine courte, ici dessinée sur ordinateur plutôt qu'extraite du vivant : c'est la **conception de novo**, par opposition au fait de partir d'une molécule existante pour l'améliorer. Les **GPCR** sont des récepteurs plantés dans la membrane des cellules, qui transmettent un signal vers l'intérieur ; ils constituent une part majeure des cibles visées par les médicaments actuels.

<figure>
	<img src="/figures/conception-proteine.svg" alt="Comparaison en deux panneaux : à gauche une grille dense de molécules testées une à une avec quelques touches, à droite quelques candidats prédits par un modèle puis vérifiés en laboratoire" />
	<figcaption>Les deux méthodes ne cherchent pas au même endroit : le criblage épuise un stock de molécules existantes, la conception calcule des formes adaptées à une cible donnée. Dans les deux cas, la vérification en laboratoire reste obligatoire.</figcaption>
</figure>

L'écart n'est pas seulement technique, il est économique. Le criblage à haut débit teste des millions de composés, un par un, jusqu'à tomber sur une correspondance. La conception computationnelle remplace cette exploration par le test d'un petit nombre de candidats prédits, ce qui comprime le coût et la durée de la phase de découverte — celle qui précède tout essai chez l'animal ou chez l'humain. Les GPCR représentant une part importante des cibles médicamenteuses, l'effet de levier industriel est considérable.

## Vérifier sur du tissu humain

Reste la question de la vérification, justement. Sur ce terrain, un troisième travail publié dans *Nature* à la mi-septembre 2026 montre ce que la recherche peut désormais faire avec du tissu humain. L'équipe de Sergiu Pașca a greffé des **organoïdes** cérébraux humains dans des souris dont le cortex avait été génétiquement appauvri.[^3][^4]

La difficulté était de faire de la place : les chercheurs ont conçu une stratégie génétique créant un espace cortical disponible. Les organoïdes transplantés s'y sont différenciés en une diversité de cellules cérébrales humaines, se sont organisés en circuits neuronaux et ont formé des structures ressemblant à du tissu cortical. Les souris portant ces organoïdes présentent des différences de performance motrice et mnésique par rapport aux autres, ainsi que des anomalies de démarche après une lésion hypoxique.

> **En clair**
> Un **organoïde** est une miniature de tissu cultivée à partir de cellules souches, qui reproduit en laboratoire une partie de l'organisation d'un organe. Ici, il ne s'agit pas d'un cerveau en réduction : c'est un fragment de tissu humain vivant, intégré à un circuit existant, qui permet d'observer des maladies humaines sur un substrat humain.

Les auteurs eux-mêmes soulèvent la question des lignes directrices éthiques applicables à ces modèles dits chimériques. C'est le revers de la même médaille : ce qui rend ces travaux utiles — un tissu humain qui fonctionne dans un organisme vivant — est aussi ce qui rend leur encadrement nécessaire.

## Ce que l'on ne sait pas

- **Le résultat d'Insilico ne vaut pas validation d'un traitement.** Il repose sur un essai de phase IIa de 42 patients ; les auteurs et la publication parlent d'un signal, pas d'une efficacité démontrée.
- **L'« âge biologique » est une prédiction de modèle.** Les six horloges protéomiques sont indépendantes, ce qui renforce la convergence, mais elles restent des constructions statistiques : aucune ne mesure directement le vieillissement.
- **Les miniprotéines ne sont pas des médicaments.** Les auteurs de la publication dans *Nature* le précisent explicitement ; la fixation sur la cible a été visualisée, pas un effet thérapeutique chez l'humain.
- **Les organoïdes ont été observés chez la souris.** Les différences de comportement et les anomalies de démarche relèvent d'un modèle animal ; leur transposition à des maladies humaines reste à établir.
- **La collecte s'appuie sur des relais de publication.** Les trois résultats sont publiés dans des revues à comité de lecture, mais cette note s'appuie sur les communiqués de publication et institutionnels, pas sur le texte intégral des articles.
- **L'effet sur la maladie n'est pas établi.** La capacité vitale forcée va dans le même sens que les horloges protéomiques, mais un essai de 42 patients ne permet pas de conclure sur l'évolution de la fibrose pulmonaire.

[^1]: EurekAlert / Insilico Medicine, communiqué de publication de l'étude parue dans *Nature Biotechnology* — https://e3.eurekalert.org/news-releases/1142848

[^2]: IIT Kanpur, « AI-designed miniproteins to block key drug targets » — https://www.iitk.ac.in/ai-designed-miniproteins-to-block-key-drug-targets

[^3]: Nature Portfolio, communiqué de presse de l'étude parue dans *Nature* — http://www.natureasia.com/en/info/press-releases/detail/9442

[^4]: Publication primaire (référence de l'étude sur les organoïdes, citée par le communiqué) : Kaganovsky et al., *Nature*, 2026 — doi:10.1038/s41586-026-11032-2
