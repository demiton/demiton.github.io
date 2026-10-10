---
title: "Processeurs photoniques : où en est vraiment le calcul par la lumière"
description: "La photonique entre en production industrielle en 2026 — mais surtout pour transporter les données. Ce que les mesures publiées montrent du calcul optique, et les trois verrous qui subsistent."
date: 2026-10-07
category: Semi-conducteurs
tags: [photonique, calcul-optique, interconnexion, puces, ia]
cover: /covers/photonique.svg
---

Le calcul par la lumière n'est plus une curiosité de laboratoire. En 2026, une entreprise dont c'est le cœur technologique est entrée en bourse à Hong Kong, et une revue de premier rang a publié les performances système d'un accélérateur optique fabriqué sur une ligne de production. Mais en lisant les chiffres de près, une conclusion s'impose : cette année, la photonique a surtout gagné l'**interconnexion** — transporter les données d'un point à un autre — et le calcul optique reste un accélérateur spécialisé.

## L'essentiel

- **Lightelligence** (曦智科技) entre au HKEX le 28 avril 2026 et ouvre à **+380 %** ; mais environ **80 % de son chiffre d'affaires 2025** vient de l'interconnexion optique, pas du calcul.[^1]
- La revue *Nature* publie les mesures complètes de **PACE**, un accélérateur optoélectronique dont la carte est fabriquée en production.[^2]
- Au MIT, un processeur tensoriel optique réalise une multiplication matrice-matrice **en un seul passage**, à environ **20 attojoules par opération**, avec une précision supérieure à 8 bits — énergie optique seule, hors électronique de pilotage.[^3]
- La **mémoire optique** reste le maillon faible : la meilleure démonstration publiée conserve **3,2 Mbit pendant 20 millisecondes**.[^4]
- L'argent, lui, va à l'interconnexion : **2 milliards de dollars** de NVIDIA dans Lumentum, 2 milliards dans Coherent, **1 milliard** pour le rachat de Celestial AI par Marvell, et **650 millions** levés par Ayar Labs en 2026.[^5][^6][^7]

## Transmettre et calculer : deux métiers qu'on confond

« Puce photonique » recouvre deux activités que tout oppose. La première consiste à **transporter** des bits avec de la lumière : le calcul reste électronique, seule la liaison change de nature. La seconde consiste à faire porter l'**opération arithmétique** elle-même par la lumière.

<figure>
	<img src="/figures/calcul-lumiere.svg" alt="Deux panneaux comparés : à gauche la chaîne de transmission optique avec conversion électricité-lumière puis lumière-électricité, à droite le calcul photonique avec laser, interféromètres et photodétecteur de lecture" />
	<figcaption>Transmettre par la lumière est déjà industrialisé ; calculer avec elle reste expérimental. Les deux chaînes se rejoignent sur le même point de friction : la reconversion en électricité.</figcaption>
</figure>

> **En clair**
> Un **guide d'onde** est un canal microscopique gravé dans la tranche de silicium : il confine la lumière comme un fil confine le courant. Un **modulateur** est l'interrupteur qui inscrit l'information sur cette lumière, en modifiant son intensité ou sa phase.

La transmission a un avantage décisif : elle n'a pas besoin d'être exacte au bit près pendant des milliers d'opérations successives. Le calcul, si. C'est ce qui explique le déséquilibre actuel du marché.

## Ce qui a réellement été mesuré

Trois résultats de 2026 sortent du rang, parce qu'ils portent sur des systèmes complets et non sur des extrapolations.

**PACE, chez Lightelligence**, est un accélérateur optoélectronique dont la carte Tianshu intègre une matrice optique de 128 × 128 — plus de 40 000 dispositifs photoniques — avec un packaging 3D et une source laser embarquée. L'architecture est dite incohérente, un choix assumé pour la maîtrise de la précision et la résistance au bruit. L'usage visé n'est pas l'IA générative mais l'**optimisation combinatoire** — ces problèmes où l'on cherche la meilleure combinaison parmi un nombre astronomique, comme le découpage d'un graphe.[^2]

> **En clair**
> Une architecture **incohérente** n'utilise pas la phase de la lumière pour coder l'information, seulement son intensité. C'est moins élégant que l'optique cohérente, mais bien plus robuste aux variations de température et de fabrication.

**Au MIT**, l'équipe de Dirk Englund a fait autre chose : un processeur tensoriel qui multiplexe l'information dans l'espace, la longueur d'onde et le temps, et réalise une multiplication matrice-matrice en un seul passage grâce à un réseau de diffraction entraîné. Le réseau compte près de 300 000 paramètres, classe des images avec 96,4 % d'exactitude, et consomme environ 20 attojoules par multiplication-accumulation. Cette mesure ne compte que l'**énergie optique** : la conversion électrique, le pilotage des modulateurs et la lecture restent à la charge de l'électronique.[^3]

**La mémoire**, enfin, est le résultat le plus révélateur. Une équipe sino-canadienne a stocké une trame de 3,2 Mbit — une image en 256 niveaux d'amplitude — dans une boucle optique, et l'a relue après plus de 200 circulations, soit plus de 20 millisecondes. Les auteurs estiment qu'en empilant une quarantaine de longueurs d'onde, la capacité théorique atteindrait 3,84 Gbit.[^4] Pour situer : une barrette de mémoire vive électronique manipule des gigaoctets sans effort.

## Où va l'argent : l'interconnexion

Le contraste est frappant entre la recherche et les investissements. En janvier 2026, NVIDIA a présenté un réseau Ethernet à **optique co-packagée** — les composants optiques sont soudés dans le même boîtier que le commutateur, au lieu d'être des modules enfichables — avec une réduction de puissance annoncée de 5 × par port à 1,6 Tb/s, et un commutateur à 409,6 Tb/s. En mars, l'entreprise plaçait 2 milliards de dollars dans Lumentum et 2 milliards dans Coherent, deux fabricants de composants photoniques.[^5] La lumière devient un **poste d'approvisionnement stratégique**, dominé par les lasers.

> **En clair**
> Un **module enfichable** se branche comme une clé USB sur le commutateur ; l'**optique co-packagée** soude le convertisseur optique à quelques millimètres de la puce. Le trajet électrique est plus court, donc moins énergivore — mais le module n'est plus remplaçable.

Le reste du marché suit la même pente. Marvell a finalisé le rachat de Celestial AI pour 1 milliard de dollars en trésorerie et environ 27 millions d'actions, avec un objectif de rythme annualisé de 500 millions de dollars fin 2028.[^6] Ayar Labs a porté à 650 millions de dollars son financement 2026, avec AMD, Intel, MediaTek et NVIDIA à son capital, pour passer à la production de volume.[^7] Lightmatter a présenté un moteur optique bidirectionnel de 12,8 Tb/s qui, en attribuant une longueur d'onde par sens de circulation sur une seule fibre, ferait passer un cluster de 512 GPU d'environ 130 000 à 65 000 fibres.[^8] NTT, de son côté, annonce un commutateur photonique à 51,2 Tb/s et une version commerciale à 102,4 Tb/s pour 2026 — mais place l'optique *à l'intérieur* des puces vers 2032 seulement.[^9]

| Acteur | Ce qu'il vend ou annonce | Statut |
| --- | --- | --- |
| NVIDIA | Optique co-packagée, commutateur 409,6 Tb/s | Produit annoncé, spécifications auto-déclarées |
| Marvell / Celestial AI | Interconnexion optique *scale-up* | Acquisition finalisée (document SEC) |
| Lightmatter | Moteur optique bidirectionnel 12,8 Tb/s | Kits d'évaluation annoncés pour début 2027 |
| Ayar Labs | Interconnexion co-packagée de volume | 650 M$ levés, passage en production |
| NTT | Commutateur photonique 51,2 Tb/s | Déploiement par étapes, auto-déclaré |
| Lightelligence | Accélérateur de calcul optique | Coté en bourse, calcul en phase initiale |

## Les trois verrous

**La mémoire.** Sans mémoire optique, chaque étape intermédiaire d'un calcul doit revenir dans l'électronique : le gain de latence disparaît. Les 3,2 Mbit pendant 20 ms sont une preuve de principe, pas une solution.

**La conversion.** À chaque entrée et chaque sortie, la lumière doit être produite, modulée, détectée, puis retraitée. Intel chiffre ce coût à environ 5 picojoules par bit pour un circuit d'émission-réception classique, contre environ 1 picojoule lorsqu'il est déplacé dans un chiplet optique, pour une cible système sous 5 pJ/bit — sachant que ces spécifications proviennent d'un compte rendu de conférence tiers, et non d'un document de l'entreprise.[^10]

**La précision.** Le calcul optique est analogique : il n'a pas de bits, seulement des niveaux d'amplitude. Lightelligence annonce une précision de sortie optique de 8 bits, avec des entrées en INT4 et des sorties en INT4, INT8 ou INT16 ; le démonstrateur du MIT mesure plus de 8 bits.[^2][^3] En dessous de ce seuil, l'intérêt pour l'IA et le calcul scientifique s'effondre.

> **En clair**
> Le **picojoule par bit** est la mesure de l'énergie nécessaire pour transmettre un bit d'information. C'est l'unité qui décide si un lien optique est plus économique qu'un lien en cuivre : tant qu'elle reste trop élevée, le cuivre garde l'avantage sur les courtes distances.

## Ce que l'on ne sait pas

- **Plusieurs sources primaires étaient inaccessibles** au moment de la collecte : les pages de Reuters renvoient un mur d'authentification, celles de *Nature* une redirection, et IEEE Spectrum un contenu vide. Certains recoupements reposent donc sur des titres de presse, pas sur le corps des articles.
- **La date de publication de l'article Nature sur PACE est incohérente** : l'entreprise annonce le 9 avril 2026, mais l'identifiant de l'article porte l'année 2025.
- **La précision annoncée par Lightelligence est ambiguë** : « 8 bits » décrit un niveau analogique effectif, tandis que « INT4/INT8/INT16 » désigne des types numériques supportés. La page produit ne distingue pas les deux.
- **Les chiffres d'Intel sur l'entrée-sortie optique proviennent d'un compte rendu tiers**, non d'un document de l'entreprise.
- **Les performances de NTT sont auto-déclarées** et n'ont pas été reproduites indépendamment.
- **Le programme DARPA PICASSO n'a pas pu être vérifié** : la page de sollicitation consultée était vide et le domaine de l'agence ne répondait pas. Il est donc absent de cet article.
- **IBM est absent faute de source primaire** : la seule piste trouvée était un titre de presse japonaise derrière un mur payant.
- **Le silence de Lightmatter sur son produit de calcul n'est pas une preuve d'arrêt** : toutes ses communications de 2026 portent sur l'interconnexion, mais l'absence d'annonce ne dit rien de l'état du programme.
- **Les chiffres d'énergie ne sont pas comparables entre eux** : ils portent tantôt sur un port complet, tantôt sur une liaison, tantôt sur une seule opération, et sont majoritairement déclarés par les intéressés.

[^1]: 证券时报 (Securities Times) — https://stcn.com/article/detail/3869253.html — et 新华财经 (Xinhua Finance) — https://m.cnfin.com/gs-lb//zixun/20260428/4405786_1.html

[^2]: Lightelligence, publications (article *Nature* référencé : https://www.nature.com/articles/s41586-025-08786-6, page non accessible) — https://lightelligence.ai/community/papers/9

[^3]: MIT Research Laboratory of Electronics, processeur tensoriel optique — https://www.rle.mit.edu/single-shot-matrix-matrix-photonic-processor-based-on-spatial-spectral-hypermultiplexed-parallel-diffraction/ — version complète consultée : https://ar5iv.labs.arxiv.org/html/2503.24356

[^4]: EurekAlert, mémoire optique numérique (article *Intelligent Opto-Electronics*, DOI 10.67704/ioe.2026.260008) — https://www.eurekalert.org/news-releases/1140106

[^5]: NVIDIA, Spectrum-X Ethernet Photonics — https://developer.nvidia.com/blog/scaling-power-efficient-ai-factories-with-nvidia-spectrum-x-ethernet-photonics/ — investissements : Reuters — https://www.reuters.com/5f374b32b07b/technology/nvidia-invest-2-billion-photonic-product-maker-lumentum-2026-03-02/

[^6]: Marvell, formulaire 8-K/A déposé à la SEC — https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-032861/d45933dex991.htm

[^7]: Ayar Labs, communiqué — https://ayarlabs.com/news/ayar-labs-expands-2026-funding-to-650-million

[^8]: Lightmatter, Passage L20 CPX — https://lightmatter.co/press-release/lightmatter-joins-open-cpx-msa-introduces-the-industrys-first-bidirectional-cpx-optical-engine/

[^9]: NTT, Insights Hub — https://www.global.ntt/insights-hub/the-photonics-revolution/

[^10]: Intel à l'OFC 2026, compte rendu tiers — https://cloud.tencent.com.cn/developer/article/2649993
