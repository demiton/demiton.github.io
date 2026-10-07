---
title: "La mémoire est devenue le goulot d'étranglement de l'IA"
description: "Les GPU ne servent à rien sans mémoire rapide. Or les trois fabricants mondiaux vendent déjà leur production 2027, et Micron annonce une tension jusqu'en 2028."
date: 2026-10-07
category: Semi-conducteurs
tags: [mémoire, hbm, dram, ia, semi-conducteurs]
cover: /covers/memoire-hbm.svg
---

Pendant deux ans, la question de l'infrastructure d'IA a été celle des processeurs : qui aurait assez de GPU. Ce trimestre, le centre de gravité s'est déplacé d'un cran dans la chaîne. Ce n'est plus le calcul qui manque, c'est la **mémoire** qui l'alimente — et les trois entreprises capables d'en produire pour l'IA vendent déjà leur production de 2027.

## L'essentiel

- **Micron annonce une offre « nettement plus tendue » en 2027 et 2028 qu'en 2026**, sans visibilité sur un retour à l'équilibre.
- **Plus de 75 % de sa production 2027 est déjà engagée** : les prix de l'an prochain sont fixés avant que les usines aient produit.
- Le chiffre d'affaires trimestriel de Micron atteint un record de **54,2 milliards de dollars**, avec des prix DRAM en hausse de près de 20 % et NAND d'environ 30 % sur le trimestre.
- **TrendForce confirme la tendance** : les négociations de prix contractuels du quatrième trimestre 2026 repartent à la hausse, sur une offre « extrêmement tendue ».
- Le premier fournisseur chinois de mémoire, YMTC, estime la pénurie à **« au moins trois ans de plus »** — et préfère monter ses prix plutôt que casser le marché.

## Pourquoi la mémoire commande la cadence

Un accélérateur d'IA est un processeur qui passe son temps à attendre des données. Sa puissance se mesure autant en calcul qu'en **bande passante mémoire** : la vitesse à laquelle il peut lire les milliards de paramètres d'un modèle. Un GPU sans mémoire assez rapide est une usine avec un quai de déchargement trop étroit — les machines tournent, mais elles tournent à vide.

C'est le rôle du **HBM**, pour *High Bandwidth Memory* : au lieu de poser les puces mémoire à côté du processeur, on les empile les unes sur les autres et on les colle juste à côté, reliées par des milliers de connexions verticales. Un module HBM moderne, c'est huit à douze puces DRAM empilées sur une puce de base.

<figure>
	<img src="/figures/chaine-hbm.svg" alt="Quatre étapes illustrées : plaquette DRAM, empilement HBM, packaging CoWoS, accélérateur d'IA" />
	<figcaption>La mémoire d'un système d'IA traverse quatre étapes, toutes capacitives. Une seule couche défectueuse dans un empilement fait perdre l'ensemble du module.</figcaption>
</figure>

> **En clair**
> Le HBM n'est pas une mémoire « plus rapide » au sens habituel : c'est la même mémoire, mais **rapprochée et empilée**. La distance physique est le facteur limitant, pas la technologie de stockage elle-même.

Cette architecture a une conséquence industrielle : elle rend la mémoire indissociable du processeur. On ne peut pas compenser un manque de HBM en achetant plus de GPU, ni l'inverse. Les deux pénuries se déclenchent ensemble.

## Trois sources, une même conclusion

Le diagnostic ne vient pas d'un seul acteur. Micron, qui publie ses résultats trimestriels, décrit une demande qui dépasse l'offre jusqu'en 2028.[^1] TrendForce, cabinet d'analyse indépendant, observe le même déséquilibre du côté des **prix contractuels** — ces contrats négociés à l'avance entre fabricants et acheteurs, qui servent de référence au marché.[^2] Enfin YMTC, troisième fournisseur mondial de mémoire NAND, parle d'« au moins trois ans de plus » de pénurie.

Trois positions différentes — un industriel occidental, un cabinet taïwanais, un producteur chinois — et une seule conclusion. C'est ce recoupement qui donne sa solidité à l'information : aucun des trois n'a intérêt à décrire la même tension.

> **En clair**
> Un **prix contractuel** est un tarif négocié pour plusieurs mois de livraisons, par opposition au prix au comptant, qui varie au jour le jour. C'est le contrat qui dit la tendance de fond ; le comptant dit l'humeur du marché.

Le quatrième signal est social. Le syndicat de Micron à Taïwan, qui revendique plus de 80 % de salariés syndiqués sur les sites de Taoyuan et Taichung — deux usines DRAM majeures —, réclame un partage des profits à 15 % du résultat opérationnel, et un vote de grève était envisagé début octobre.[^3] Dans un marché sans marge de manœuvre, une grève sur ces sites serait un choc d'offre immédiat.

## Ce que la tension change, concrètement

| Indicateur | Ce que disent les chiffres |
| --- | --- |
| Production 2027 de Micron | plus de 75 % déjà engagée |
| Prix DRAM sur le trimestre | en hausse de près de 20 % |
| Prix NAND sur le trimestre | environ +30 % |
| Horizon de tension annoncé | 2027 et 2028, sans retour à l'équilibre |
| Côté chinois (YMTC) | « au moins trois ans de plus » |

Le transfert de valeur est net : il va des assembleurs de serveurs et des fabricants de PC et de smartphones vers trois fournisseurs — Samsung, SK hynix et Micron — auxquels s'ajoute désormais la Chine. Pour un acheteur, la conséquence est simple : le coût d'un serveur d'IA dépendra de moins en moins du choix du GPU et de plus en plus de la disponibilité de la mémoire.

Côté HBM4, la génération qui équipe les systèmes les plus récents, les trois fournisseurs sont qualifiés et se disputent la charge. SK hynix aurait obtenu environ 70 % de la demande allouée par NVIDIA pour 2026, selon des sources citées par l'agence Yonhap[^4] — un chiffre à prendre comme un ordre de grandeur, pas comme un contrat publié.

## Pourquoi la correction ne viendra pas vite

Une pénurie de mémoire ne se résout pas comme un manque de main-d'œuvre : elle se résout par des usines, qui coûtent plusieurs milliards et se construisent en trois à quatre ans. Les trois fabricants ont donc intérêt à la tension, ce qui explique qu'aucun n'ait annoncé de capacité nouvelle capable de casser les prix avant 2028. C'est précisément le raisonnement que décrit Micron lorsqu'il refuse de donner une date de retour à l'équilibre.[^1]

## Ce que l'on ne sait pas

- **L'horizon exact de la pénurie est contradictoire.** Micron parle de 2027-2028, TrendForce anticipe un assouplissement du NAND au second semestre 2027, et YMTC évoque un délai bien plus long. Ces prévisions ne portent pas forcément sur les mêmes segments.
- **La déclaration de YMTC repose sur un seul employé, anonyme**, et non sur une prévision officielle de l'entreprise.
- **Le conflit social chez Micron n'est pas tranché** : les deux parties se disaient en négociation, avec une réunion prévue le 22 octobre 2026.
- **Les chiffres de prix sont des variations trimestrielles**, pas des niveaux absolus : ils disent la direction, pas le montant payé par un acheteur donné.
- **ASML, qui conditionne la capacité future**, n'avait pas encore publié ses résultats du troisième trimestre au moment de la rédaction ; ils sont attendus le 14 octobre 2026.

[^1]: TechPowerUp, « Micron CEO says memory supply will be much tighter in 2027 and 2028 than in 2026 » — https://www.techpowerup.com/353296/micron-ceo-says-memory-supply-will-be-much-tighter-in-2027-and-2028-than-in-2026

[^2]: DigitalToday (d'après TrendForce), « RAM/SSD prices: US cloud demand tightens DRAM supply » — https://www.digitaltoday.co.kr/en/view/111830/ram-ssd-prices-us-cloud-demand-tightens-dram-supply

[^3]: Sourceability (d'après Digitimes et TrendForce), « Labor risks deepen semiconductor shortage strain amid AI investments » — https://sourceability.com/post/labor-risks-deepen-semiconductor-shortage-strain-amid-ai-investments

[^4]: Yonhap, « NVIDIA allocates HBM4 orders » — https://en.yna.co.kr/view/AEN20260128002800320
