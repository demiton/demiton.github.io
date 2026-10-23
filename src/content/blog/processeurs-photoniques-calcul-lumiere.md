---
title: "Processeurs photoniques : où en est vraiment le calcul par la lumière"
description: "Ce que trois mesures publiées disent du calcul optique : 16 000 composants à 1 GHz, une multiplication matrice-matrice en un seul passage, 3,2 Mbit de mémoire optique. Et pourquoi les chiffres d'énergie ne se comparent pas encore."
date: 2026-10-07
category: Semi-conducteurs
tags: [photonique, calcul-optique, interconnexion, puces, ia]
cover: /covers/photonique.svg
---

Un processeur photonique ne commute pas des électrons : il fait interférer de la lumière, puis lit le résultat. En 2026, trois mesures donnent pour la première fois des chiffres portant sur des systèmes complets — un accélérateur intégré de plus de 16 000 composants à 1 GHz avec 3 nanosecondes de latence par cycle, un processeur tensoriel qui réalise une multiplication matrice-matrice en un seul passage pour environ 20 attojoules par opération, et une mémoire optique qui conserve 3,2 Mbit pendant 20 millisecondes.

## L'essentiel

- **16 000 composants, 1 GHz, 3 ns par cycle.** PACE, décrit dans *Nature*, associe plus de 16 000 composants photoniques à une puce électronique qui porte logique, mémoire et contrôle.[^1]
- **Une multiplication matrice-matrice en un seul passage.** Le processeur du MIT multiplexe l'information sur trois dimensions physiques et classe des images à 96,4 %, pour environ 20 attojoules par opération — énergie optique seule.[^2]
- **3,2 Mbit conservés pendant 20 millisecondes.** La meilleure mémoire optique publiée relit sa trame après plus de 200 circulations.[^3]
- **La brique source progresse** : un laser femtoseconde intégré délivre 1,05 nanojoule par impulsion, en 147 femtosecondes.[^4]
- **Ces chiffres ne se comparent pas.** 20 attojoules par opération est une énergie optique ; la conversion électricité-lumière se compte en picojoules par bit, un facteur d'un million.

## Ce qui a été mesuré, et comment

### PACE : 16 000 composants, 3 nanosecondes par cycle

Le dispositif exécute la fonction standard de multiplication-accumulation de matrices, celle qui domine le calcul des réseaux de neurones. Il compte plus de 16 000 composants photoniques, et la logique, la mémoire et le contrôle sont intégrés dans une puce électronique dédiée ; les deux sont assemblées par un packaging 2.5D hybride, où un interposeur relie les puces plutôt que des fils.

Ce qui a été mesuré : une fréquence jusqu'à 1 GHz et une latence aussi faible que 3 nanosecondes par cycle. L'application démontrée n'est pas l'IA générative mais le **solveur heuristique de problèmes d'Ising**, une optimisation combinatoire dont la performance dépend directement de la latence.

Le statut est le plus solide de cet article : publication dans *Nature* (volume 640, pages 361-367), avec DOI et comité de lecture.[^1] Une réserve de lecture : la page produit de l'entreprise annonce, pour une génération ultérieure, une matrice de 128 × 128, plus de 40 000 dispositifs et 200 picosecondes de latence — des chiffres d'entreprise, qui ne sont pas ceux de l'article.[^5]

> **En clair**
> Une opération **MAC** (multiply-accumulate) est une multiplication suivie d'une addition. Un réseau de neurones en enchaîne des milliards : c'est l'unité de compte qui permet de comparer deux machines, à condition de préciser ce qu'on y inclut.

### MIT : une multiplication matrice-matrice en un seul passage

Le dispositif est un processeur tensoriel optique qui multiplexe l'information dans l'espace, la longueur d'onde et le temps, et réalise une multiplication matrice-matrice en une seule propagation à travers un réseau de diffraction entraîné.

Le protocole, tel que le décrit la prépublication : un réseau de 292 616 paramètres entraînés, évalué sur une classification d'images, avec 96,4 % d'exactitude. L'énergie mesurée est d'environ 20 attojoules par multiplication-accumulation et la précision supérieure à 8 bits. La diaphonie entre canaux se situe entre −46 et −50 dB, avec un espacement de 200 GHz ; le parallélisme atteint 64 MAC par cycle, limité par les 16 modulateurs pilotables simultanément.

Le statut est plus fragile : **prépublication arXiv, non évaluée par les pairs**.[^2] Et l'énergie annoncée ne couvre que la lumière : le pilotage des modulateurs, la conversion et la lecture sont comptés à part — c'est-à-dire l'essentiel du système.

### Mémoire : 3,2 Mbit pendant 20 millisecondes

Le dispositif est une boucle optique à décalage de fréquence, où la lumière tourne et se régénère par amplification Raman distribuée — un gain obtenu en injectant une onde de pompe dans la fibre elle-même.

Le protocole : une image en niveaux de gris encodée en PAM-256, soit 256 niveaux d'amplitude, stockée sous forme d'une trame de 3,2 Mbit. Elle reste détectable après plus de 200 circulations, soit plus de 20 millisecondes, avec un suivi quantitatif de la fidélité ; trois longueurs d'onde transportant les canaux rouge, vert et bleu circulent dans la même boucle. Ce qui relève de l'extrapolation : une quarantaine de canaux porteraient la capacité théorique à 3,84 Gbit.[^3]

### La source : un laser femtoseconde sur puce

Sans source stable, rien de tout cela ne fonctionne. L'équipe de Tobias Kippenberg, à l'EPFL, a démontré un laser ultrarapide intégré : 1,05 nanojoule par impulsion, 147 femtosecondes, une puissance crête de l'ordre du kilowatt, dans une cavité de 42 cm repliée en nitrure de silicium dopé à l'erbium. Plus de 1 000 cavités tiendraient sur une tranche.[^4]

<figure>
	<img src="/figures/calcul-lumiere.svg" alt="Deux panneaux comparés : à gauche la chaîne de transmission optique avec conversion électricité-lumière puis lumière-électricité, à droite le calcul photonique avec laser, interféromètres et photodétecteur de lecture" />
	<figcaption>Transmettre par la lumière est industrialisé ; calculer avec elle reste expérimental. Les deux chaînes se rejoignent sur le même point de friction : la reconversion en électricité.</figcaption>
</figure>

## Ramener les chiffres à la même échelle

C'est ici que la plupart des comparaisons deviennent fausses : les grandeurs ne portent ni sur les mêmes périmètres ni sur les mêmes unités.

| Grandeur | Valeur | Périmètre couvert | Comparable à |
| --- | --- | --- | --- |
| Énergie par MAC (MIT) | ~20 aJ | lumière seule | rien de publié dans ce périmètre |
| Conversion, cible (Intel) | < 5 pJ/bit | liaison de bout en bout | oui, entre liaisons |
| Conversion seule (Intel) | ~5 pJ/bit classique, ~1 pJ/bit en chiplet | émission-réception | oui, entre architectures |
| Latence (PACE) | 3 ns/cycle | un cycle de calcul | non comparable à une latence réseau |
| Mémoire optique | 3,2 Mbit / 20 ms | une trame, une boucle | non comparable à de la DRAM |

Le facteur qui manque le plus souvent : **1 picojoule vaut un million d'attojoules**. Les 20 aJ par opération du MIT et les 5 pJ par bit d'Intel diffèrent donc de cinq ordres de grandeur — mais ils ne mesurent pas la même chose. Pour comparer, il faudrait le nombre d'opérations nécessaires pour traiter un bit, conversion incluse.

## Les trois verrous

**La mémoire.** Sans mémoire optique, chaque étape intermédiaire revient dans l'électronique, ce qui annule le gain de latence. Les 3,2 Mbit pendant 20 ms sont une preuve de principe : une barrette de mémoire vive électronique manipule des gigaoctets sans effort.

**La conversion.** À chaque entrée et chaque sortie, la lumière doit être produite, modulée, détectée, puis retraitée. Intel chiffre ce coût à environ 5 pJ/bit pour un circuit classique, contre environ 1 pJ/bit dans un chiplet optique, pour une cible système sous 5 pJ/bit — des spécifications issues d'un compte rendu de conférence tiers, non d'un document de l'entreprise.[^6]

**La précision.** Le calcul optique est analogique : il n'a pas de bits, seulement des niveaux d'amplitude. Lightelligence annonce une précision de sortie de 8 bits, avec des entrées en INT4 ; le démonstrateur du MIT mesure plus de 8 bits.[^5][^2] En dessous de ce seuil, l'intérêt pour l'IA s'effondre.

## Ce que l'argent achète

Les investissements de l'année financent l'interconnexion, pas le calcul. NVIDIA a présenté un réseau à optique co-packagée — les convertisseurs sont soudés dans le même boîtier que le commutateur — avec une réduction de puissance annoncée de 5 × par port à 1,6 Tb/s, et a placé 4 milliards de dollars dans deux fabricants de composants photoniques, Lumentum et Coherent, c'est-à-dire dans les **lasers**.[^7] Marvell a finalisé le rachat de Celestial AI pour 1 milliard de dollars en trésorerie, achetant une équipe et une technologie d'interconnexion.[^8] Ayar Labs a porté son financement à 650 millions pour passer à la production de volume.[^9]

Lightelligence illustre la nuance : environ 80 % de son chiffre d'affaires 2025 vient de l'interconnexion, le calcul restant en phase de commercialisation initiale. Son entrée en bourse finance une recherche qui a coûté plus de 1,1 milliard de yuans entre 2023 et 2025, sans prouver la maturité du calcul.[^10] Deux jalons situent l'horizon : Lightmatter annonce un moteur optique bidirectionnel de 12,8 Tb/s qui réduirait de moitié le nombre de fibres d'un cluster de 512 GPU,[^11] et NTT place l'optique *à l'intérieur* des puces vers 2032 seulement — l'horizon réaliste du calcul photonique intégré, dit par l'un des acteurs les plus avancés.[^12]

## Ce que l'on ne sait pas

- **La date de la publication PACE a été corrigée** : *Nature* l'a publiée le 9 avril 2025, et non en 2026 comme l'annonçait l'entreprise ; l'identifiant DOI portait bien l'année 2025.[^1]
- **Deux jeux de chiffres coexistent chez Lightelligence** : ceux de l'article (16 000 composants, 1 GHz, 3 ns) et ceux de la page produit (128 × 128, 40 000 dispositifs, 200 ps), non vérifiés par une publication.
- **Les résultats du MIT sont une prépublication** ; l'énergie de 20 aJ/MAC exclut conversion et pilotage.
- **La mémoire à 3,84 Gbit est une extrapolation** des auteurs, pas une mesure.
- **Plusieurs sources primaires étaient inaccessibles** : Reuters renvoie un mur d'authentification, IEEE Spectrum un contenu vide.
- **Les chiffres d'Intel** proviennent d'un compte rendu tiers ; **ceux de NTT sont auto-déclarés**.
- **DARPA PICASSO et IBM sont absents** faute de sources vérifiables.
- **Le silence de Lightmatter sur son produit de calcul** n'est pas une preuve d'arrêt.

[^1]: Hua S. et al., « An integrated large-scale photonic accelerator with ultralow latency », *Nature* 640, 361-367 (2025) — article : https://www.nature.com/articles/s41586-025-08786-6 — notice et DOI : https://research-explorer.ista.ac.at/record/21549

[^2]: MIT Research Laboratory of Electronics, processeur tensoriel optique — https://www.rle.mit.edu/single-shot-matrix-matrix-photonic-processor-based-on-spatial-spectral-hypermultiplexed-parallel-diffraction/ — version complète consultée : https://ar5iv.labs.arxiv.org/html/2503.24356

[^3]: EurekAlert, mémoire optique numérique (article *Intelligent Opto-Electronics*, DOI 10.67704/ioe.2026.260008) — https://www.eurekalert.org/news-releases/1140106

[^4]: EPFL, « Un laser ultrarapide sur puce » — https://actu.epfl.ch/news/un-laser-ultrarapide-sur-puce-4/ — publication : *Nature*, DOI 10.1038/s41586-026-10517-4

[^5]: Lightelligence, page produit PACE2 — https://www.lightelligence.ai/products/photon-computing/pace2 — et page communautaire citant l'article : https://lightelligence.ai/community/papers/9

[^6]: Intel à l'OFC 2026, compte rendu tiers — https://cloud.tencent.com.cn/developer/article/2649993

[^7]: NVIDIA, Spectrum-X Ethernet Photonics — https://developer.nvidia.com/blog/scaling-power-efficient-ai-factories-with-nvidia-spectrum-x-ethernet-photonics/ — investissements : Reuters — https://www.reuters.com/5f374b32b07b/technology/nvidia-invest-2-billion-photonic-product-maker-lumentum-2026-03-02/

[^8]: Marvell, formulaire 8-K/A déposé à la SEC — https://investor.marvell.com/sec-filings/all-sec-filings/content/0001193125-26-032861/d45933dex991.htm

[^9]: Ayar Labs, communiqué — https://ayarlabs.com/news/ayar-labs-expands-2026-funding-to-650-million

[^10]: Securities Times (presse financière chinoise) — https://stcn.com/article/detail/3869253.html — et Xinhua Finance — https://m.cnfin.com/gs-lb//zixun/20260428/4405786_1.html

[^11]: Lightmatter, Passage L20 CPX — https://lightmatter.co/press-release/lightmatter-joins-open-cpx-msa-introduces-the-industrys-first-bidirectional-cpx-optical-engine/

[^12]: NTT, Insights Hub — https://www.global.ntt/insights-hub/the-photonics-revolution/
