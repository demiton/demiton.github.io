---
title: "La mémoire est devenue le goulot d'étranglement de l'IA"
description: "Un accélérateur ne calcule presque pas : il attend des données. Débit par pile, largeur de bus, coût énergétique d'un accès : ce que mesurent les chiffres, avant la tension d'approvisionnement."
date: 2026-10-07
category: Semi-conducteurs
tags: [mémoire, hbm, dram, ia, semi-conducteurs]
cover: /covers/memoire-hbm.svg
---

Un accélérateur d'IA passe l'essentiel de son temps à attendre. Générer un jeton impose de relire les poids actifs du modèle, et c'est le débit de la mémoire qui fixe alors la cadence — pas le nombre de cœurs de calcul. La contrainte se mesure en bits par seconde et en picojoules par bit ; la tension d'approvisionnement qui fait les gros titres n'en est que la conséquence économique.

## L'essentiel

- La norme **JEDEC HBM4** (JESD270-4) fixe un bus de **2 048 bits par pile** — le double de HBM3E — et jusqu'à **8 Gb/s par broche**, soit **2 TB/s par pile**.[^1]
- **Micron** revendique **2,8 TB/s par pile** à **11 Gb/s par broche** sur ses HBM4 12 couches, avec **+20 %** d'efficacité énergétique face à HBM3E.[^2]
- Une pile HBM empile aujourd'hui **12 puces DRAM** (16 annoncées), reliées verticalement par des **TSV**, posées sur une **puce de base** logique.[^1]
- Déplacer des données coûte **deux à trois ordres de grandeur de plus** que les calculer : un accès DRAM hors puce revient à **20 à 40 pJ par bit**, contre **10 à 100 pJ** pour un accès à une SRAM.[^3]
- En inférence, le débit mémoire **divise la taille du modèle** : 70 Go de poids sur 3,35 TB/s plafonnent à environ **48 jetons par seconde**, quel que soit le nombre de cœurs.[^1]

## Ce qui a été mesuré, et comment

Le débit d'une mémoire ne se mesure pas au banc d'essai comme une fréquence : il se **déduit de l'interface**, puis se vérifie par un test de bande passante. Trois nombres suffisent — largeur du bus, débit par broche, nombre de piles — et une division par huit pour passer des bits aux octets.

<figure>
	<img src="/figures/chaine-hbm.svg" alt="À gauche, coupe d'une pile HBM : huit couches DRAM empilées, traversées de connexions verticales TSV, posées sur une puce de base et reliées à un GPU ; à droite, la formule du débit avec deux exemples chiffrés" />
	<figcaption>La largeur du bus est le levier : à fréquence de broche égale, passer de 1 024 à 2 048 bits double le débit. Les TSV raccourcissent le trajet du signal, ils n'augmentent pas la quantité de données transportées.</figcaption>
</figure>

Les chiffres publiés s'emboîtent exactement. La norme JEDEC, publiée en avril 2025 sous la référence JESD270-4, définit 2 048 bits par pile, jusqu'à 8 Gb/s par broche et 2 TB/s par pile — soit 2 048 × 8 ÷ 8 = 2 048 Go/s.[^1] Micron, qui dépasse la norme, annonce 11 Gb/s et 2,8 TB/s : le calcul redonne 2 048 × 11 ÷ 8 ≈ 2,8 TB/s, ce qui rend la revendication cohérente en interne.[^2] Samsung annonce de son côté 11,7 Gb/s, extensibles à 13, pour 3,3 TB/s par pile.[^1]

Ces nombres sont de trois natures différentes, et il faut les distinguer : **JEDEC est une norme**, pas une mesure ; **Micron et Samsung publient des revendications de produit**, non répliquées indépendamment ; **les totaux par carte** (3,35 TB/s pour une H100, 4,8 pour une H200, 8 pour une B300) sont des spécifications constructeur, cohérentes avec huit piles par accélérateur.[^1]

> **En clair**
> Un **bit par seconde** et un **octet par seconde** diffèrent d'un facteur huit : 8 Gb/s par broche, sur 2 048 broches, donnent 16 384 Gb/s, soit 2 048 Go/s ou 2 TB/s. C'est la source d'erreur la plus fréquente quand on compare des débits mémoire.

## Pourquoi la bande passante limite un accélérateur

Un calcul consomme des opérations et des données dans des proportions qui dépendent de l'algorithme. Le rapport entre les deux s'appelle l'**intensité arithmétique** : le nombre d'opérations effectuées par octet lu. Quand elle est élevée, la puce calcule ; quand elle est faible, elle attend.

> **En clair**
> Si un algorithme fait une opération par octet lu, il est **limité par la mémoire** : doubler la puissance de calcul ne change rien, puisque le goulot est l'arrivée des données. S'il fait cent opérations par octet, il est limité par le calcul, et la mémoire compte peu.

La génération de texte est dans le premier cas. Pour produire un jeton, le modèle doit parcourir ses poids actifs — des milliards d'octets — pour n'effectuer qu'une poignée d'opérations par valeur. Le plafond se calcule alors sans benchmark : 70 Go de poids, soit 7 × 10¹⁰ octets, divisés par les 3,35 × 10¹² octets par seconde d'une H100,[^1] donnent environ 21 millisecondes par jeton, soit 48 jetons par seconde. Ce chiffre est une **borne**, pas une mesure : le découpage en lots, le cache et la quantification la déplacent, dans un sens ou dans l'autre.

Le contexte aggrave le déséquilibre : à chaque jeton, le modèle relit aussi le **cache de contexte**, qui conserve les états de tout ce qui précède. Plus la fenêtre s'allonge, plus le volume à relire par jeton augmente.

## L'empilement : ce que la distance change

La solution retenue par l'industrie ne consiste pas à accélérer la mémoire, mais à **élargir le chemin**. Une puce DRAM classique communique par un bus étroit, de quelques dizaines de bits ; une pile HBM en utilise 1 024, puis 2 048.[^1] À fréquence égale, le débit double simplement parce que les bits passent en parallèle.

Le reste est une affaire de distance. Les puces DRAM sont empilées et reliées par des **TSV** — *through-silicon vias*, des connexions verticales qui traversent le silicium —, puis posées sur une puce de base logique et placées à côté du processeur sur le même boîtier.[^1][^2] Le signal parcourt des millimètres au lieu de centimètres, ce qui réduit l'énergie par bit et la latence.

L'empilement a un coût industriel direct : une pile de 12 couches contient 12 puces DRAM, et une seule défaillante fait perdre l'ensemble, ce qui pèse sur le rendement. La norme HBM4 prévoit d'ailleurs des piles de 4, 8, 12 ou 16 couches, avec des puces de 24 ou 32 Gb et jusqu'à 64 Go par pile.[^1]

## Ce que coûte un accès mémoire

La hiérarchie énergétique explique pourquoi cette architecture s'impose. Dans la mesure de référence de Mark Horowitz (ISSCC 2014), à 45 nm et 0,9 V, une addition entière coûte entre 0,03 et 0,9 pJ, une multiplication flottante entre 0,4 et 3,7 pJ, un accès à une SRAM de 8 Ko à 1 Mo entre 10 et 100 pJ, et un accès à une DRAM hors puce entre 1,3 et 2,6 nJ pour 64 bits.[^3]

Ramenez au bit : un accès DRAM hors puce revient à **20 à 40 pJ par bit** (1,3 à 2,6 nJ pour 64 bits), alors qu'un accès à une SRAM de 8 Ko à 1 Mo coûte 10 à 100 pJ, et une opération arithmétique entre 0,03 et 3,7 pJ.[^3] Un accès hors puce coûte donc des dizaines à des centaines de fois plus qu'un accès sur puce — et, rapporté à l'opération qu'il alimente, deux à trois ordres de grandeur de plus.

> **En clair**
> Ces chiffres datent de 2014, en technologie 45 nm, et portent sur de la **DRAM hors puce classique**. Une pile HBM est posée sur le même boîtier, avec un bus beaucoup plus large : son coût par bit est plus faible. Aucune valeur équivalente, mesurée sur HBM, n'a été trouvée pour cet article — les ordres de grandeur ci-dessus disent la hiérarchie, pas la valeur exacte d'un accès HBM.

C'est là que la physique devient une contrainte d'architecture : puisque relire coûte si cher, tout l'effort porte sur la **localité** — garder les données au plus près du calcul, découper les traitements pour réutiliser ce qui est déjà chargé, compresser les poids. Une puce deux fois plus rapide sur des données qu'elle n'arrive pas à lire ne gagne rien.

## Ce que cela change pour l'approvisionnement

La tension de marché se lit alors comme une conséquence, non comme le sujet. Pour augmenter la bande passante d'un accélérateur, il faut ajouter des piles ; chaque pile consomme 12 puces DRAM, une puce de base et une place dans le packaging. La demande en débit se traduit donc directement en demande de **puces mémoire et de capacité d'assemblage**, deux ressources physiquement limitées.

Trois sources décrivent la même tension : Micron annonce une offre « nettement plus tendue » en 2027-2028, avec plus de 75 % de sa production 2027 déjà engagée ;[^4] TrendForce observe les mêmes hausses sur les prix contractuels du quatrième trimestre ;[^5] YMTC évoque « au moins trois ans de plus » de pénurie.[^6] Une usine se construit en trois à quatre ans : la correction ne peut pas être immédiate.

Côté HBM4, les trois fournisseurs sont désormais qualifiés pour les accélérateurs les plus récents, et la charge se répartit très inégalement : SK hynix aurait obtenu environ 70 % de la demande allouée par NVIDIA pour 2026, selon des sources citées par l'agence Yonhap[^7] — un ordre de grandeur, pas un contrat publié.

## Ce que l'on ne sait pas

- **Aucune mesure publiée du coût énergétique d'un accès HBM** n'a été trouvée. La hiérarchie citée provient de la DRAM hors puce en 45 nm ; l'extrapoler à HBM serait une erreur de périmètre.
- **Les débits par pile de Micron et Samsung sont des revendications**, non des mesures indépendantes. Seule la norme JEDEC est un document public de référence.
- **Les deux pages NVIDIA ne donnent pas le même débit pour Vera Rubin** : 19,2 TB/s sur la page produit, 22 TB/s sur la page HGX. L'écart n'est pas expliqué par les sources consultées.
- **Le débit par pile de HBM3E n'est pas publié par les fabricants** : la valeur d'environ 1 TB/s est un calcul du comparatif cité, à partir des données produit d'AMD, et ne vaut que pour ce produit.
- **Les latences ne sont pas documentées ici** : aucune valeur sourcée n'a été trouvée, alors que c'est la seconde moitié du problème.
- **Le plafond de 48 jetons par seconde est une borne arithmétique**, pas un résultat mesuré : elle suppose un modèle dense de 70 Go, une lecture complète des poids à chaque jeton et aucun découpage en lots.
- **Les horizons de pénurie se contredisent** : Micron parle de 2027-2028, TrendForce anticipe un assouplissement du NAND au second semestre 2027, YMTC évoque un délai plus long — et ces prévisions ne portent pas forcément sur les mêmes segments.

[^1]: Aquanode, « HBM3E vs HBM4: Specs, Vendors and GPUs » (synthèse des spécifications JEDEC JESD270-4 et des fiches produit NVIDIA et AMD) — https://www.aquanode.io/blog/hbm3e-vs-hbm4

[^2]: TechPowerUp, « Micron's 12-Hi HBM4 Delivers 2.8 TB/s Bandwidth, 11 Gb/s Per-Pin Transfer Rate » — https://www.techpowerup.com/341279/microns-12-hi-hbm4-delivers-2-8-tb-s-bandwidth-11-gb-s-per-pin-transfer-rate

[^3]: Mark Horowitz, « Computing's Energy Problem (and what we can do about it) », IEEE ISSCC 2014, DOI 10.1109/ISSCC.2014.6757323 — https://ieeexplore.ieee.org/document/6757323

[^4]: TechPowerUp, « Micron CEO says memory supply will be much tighter in 2027 and 2028 than in 2026 » — https://www.techpowerup.com/353296/micron-ceo-says-memory-supply-will-be-much-tighter-in-2027-and-2028-than-in-2026

[^5]: DigitalToday (d'après TrendForce), « RAM/SSD prices: US cloud demand tightens DRAM supply » — https://www.digitaltoday.co.kr/en/view/111830/ram-ssd-prices-us-cloud-demand-tightens-dram-supply

[^6]: Sourceability (d'après Digitimes et TrendForce), « Labor risks deepen semiconductor shortage strain amid AI investments » — https://sourceability.com/post/labor-risks-deepen-semiconductor-shortage-strain-amid-ai-investments

[^7]: Yonhap, « NVIDIA allocates HBM4 orders » — https://en.yna.co.kr/view/AEN20260128002800320
