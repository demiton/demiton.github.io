---
title: "Quantique : pourquoi le nombre de qubits ne dit plus rien"
description: "Un qubit qui se trompe ne sert à rien : ce qui compte est le taux d'erreur par cycle et le nombre de qubits logiques qu'on sait en tirer. Ce que mesurent Helix et le décodeur d'IonQ, et ce qui reste hors de portée."
date: 2026-10-07
category: Technologies disruptives
tags: [quantique, correction-derreur, qubit-logique, cryogénie, mesure]
cover: /covers/quantique.svg
---

Un ordinateur quantique ne devient utile que lorsque ses erreurs sont corrigées : tant que chaque opération se trompe, ajouter des qubits ne fait qu'ajouter des erreurs. La métrique qui compte n'est donc plus le nombre de qubits physiques, mais le **taux d'erreur par cycle** et le nombre de **qubits logiques** qu'on sait en tirer. En 2026, deux mesures donnent des chiffres sur cette question précise : l'architecture Helix de Quantinuum revendique 4,6 × 10⁻⁵ d'erreur par qubit et par cycle sans post-sélection, et IonQ affirme décoder en temps réel des circuits de 408 qubits logiques sur un processeur central ordinaire, pour 0,02 % de surcoût.

## L'essentiel

- **Helix revendique 4,6 × 10⁻⁵ d'erreur par qubit et par cycle**, sans post-sélection, et 9,3 × 10⁻⁵ d'erreur logique par bloc. Record auto-déclaré, non homologué.[^1]
- **La post-sélection change tout** : le même dispositif annonce 1,9 × 10⁻⁵ en écartant 0,5 % des exécutions — un facteur cinq sur le chiffre affiché.
- **IonQ décode en temps réel sur un processeur central de 12 cœurs**, avec 408 qubits logiques répartis sur 88 blocs, plus de 31,5 millions d'opérations quantiques et 0,02 % de surcoût de décodage. Prépublication non évaluée par les pairs.[^2]
- **Le décodage doit aller plus vite que la machine** : si le décodeur classique prend du retard, l'ordinateur quantique se met en pause. C'est le verrou que IonQ dit avoir levé.
- **Chez Xanadu, la métrique est la perte photonique** : 24,1 × en 2026, objectif 1,0 × en 2030, et plus de 1 000 qubits logiques en 2031 — une feuille de route d'entreprise, pas une mesure.[^3]

## Ce qui a été mesuré, et comment

### Ce que mesure un taux d'erreur par cycle

Un qubit perd son état à la moindre perturbation, et ne se copie pas : on ne peut pas stocker son information trois fois comme on duplique un bit. La correction d'erreur quantique consiste donc à répartir l'information sur plusieurs qubits physiques et à mesurer des **syndromes** — des combinaisons qui révèlent qu'une erreur a eu lieu sans dire laquelle.

> **En clair**
> Un code se note [[n, k, d]] : **n** qubits physiques encodent **k** qubits logiques, avec une **distance d**. Plus d est grand, plus le code tolère d'erreurs simultanées. Un taux d'erreur « par cycle » est la probabilité qu'un qubit se trompe pendant une unité d'opération — une porte ou une mesure.

Deux nombres différents sont souvent confondus : le taux d'erreur **par qubit et par cycle**, qui décrit la brique, et le taux d'erreur **logique**, qui décrit le résultat du calcul encodé. C'est le second qui décide si un algorithme aboutit. Et un troisième facteur fausse les comparaisons : la **post-sélection**, qui consiste à écarter après coup les exécutions dont on sait qu'elles ont échoué.

<figure>
	<img src="/figures/correction-erreur.svg" alt="À gauche, une vingtaine de qubits physiques dont cinq en rouge ; au centre, une flèche « correction d'erreur » ; à droite, trois qubits logiques en violet, chacun entouré des qubits physiques qui le composent" />
	<figcaption>La correction d'erreur ne supprime pas les qubits fragiles : elle les regroupe en unités protégées. Le schéma illustre le principe, pas les proportions réelles — un qubit logique peut mobiliser bien davantage de qubits physiques.</figcaption>
</figure>

### Helix : concaténer deux codes correcteurs

Le dispositif est le matériel Helios de Quantinuum, à ions piégés. L'architecture Helix concatène deux codes correcteurs, notés [[10,2,3]] et [[4,2,2]] : le second protège les qubits du premier, sur le principe des poupées russes.

Ce qui a été mesuré : un taux d'erreur de 4,6 × 10⁻⁵ par qubit et par cycle sans post-sélection, un taux d'erreur logique par bloc de 9,3 × 10⁻⁵, ramené à 1,9 × 10⁻⁵ lorsqu'on écarte 0,5 % des exécutions.

Le statut, en revanche, est celui d'une **auto-évaluation** : Quantinuum précise que la qualification de record mondial repose sur « une étude de la littérature existante », et aucune instance indépendante n'a homologué la comparaison.[^1] Ce qui reste solide n'est pas le record, c'est le déplacement de la métrique : ce qui départage les acteurs est désormais le volume de calcul nécessaire pour obtenir un résultat fiable.

### IonQ : décoder en temps réel sur un processeur ordinaire

Corriger une erreur suppose de lire l'état des qubits, d'en déduire ce qui a mal tourné, puis d'appliquer la correction — en temps réel, sans ralentir le calcul plus qu'on ne le répare. Si le décodeur classique prend du retard, la machine se met en pause ; ce ralentissement porte un nom, le **stretch**.

Le dispositif est une architecture à double décodeur : un décodeur d'erreurs qui suit les corrections accumulées, et un décodeur de résultat qui intervient pendant les mesures logiques.

Ce qui a été mesuré, selon la prépublication : des circuits allant jusqu'à 408 qubits logiques répartis sur 88 blocs — 68 blocs de code et 20 usines à états magiques, ces circuits auxiliaires qui préparent les opérations non triviales — représentant plus de 31,5 millions d'opérations quantiques, 1,31 million de mesures logiques et 555 000 portes T. Le tout exécuté sur un processeur central de 12 cœurs du commerce, avec un surcoût de décodage de 0,02 % et une latence restant sous la durée du cycle d'extraction de syndrome. Les jeux d'essai comprennent des modèles de Heisenberg désordonnés et des transitions de phase induites par la mesure.

Le statut est explicite : **prépublication arXiv, non évaluée par les pairs**.[^2] Et une précision décisive, souvent perdue dans les reprises : ces 408 qubits logiques sont **simulés** — l'objet de la mesure est le décodeur classique, pas un processeur quantique exécutant 408 qubits logiques.

> **En clair**
> Une **usine à états magiques** produit un état auxiliaire coûteux, indispensable à certaines opérations. Elle ne stocke pas de données : elle alimente le calcul.

### Xanadu : la perte photonique comme métrique

Pour l'approche photonique, le facteur limitant n'est pas le bruit thermique mais la **perte** : chaque composant absorbe un peu de lumière, et le signal s'affaiblit au fil du circuit.

La feuille de route de Xanadu donne un indicateur de perte à ramener de 24,1 × en 2026 à 1,0 × en 2030, un taux d'erreur logique ciblé à 10⁻¹⁶ en 2030 — contre 10⁻³ à 10⁻⁸ annoncés pour 2028 — et des paliers de 200, 500 puis plus de 1 000 qubits logiques entre 2029 et 2031. L'architecture fonctionne à température ambiante, sur procédés silicium.[^3] Le partenariat avec GlobalFoundries, annoncé le 6 octobre, porte sur ce qui manque : la fabrication en 300 mm des détecteurs à nanofils et d'une plateforme de nitrure de silicium à très faible perte.[^4] C'est une capacité industrielle, pas une mesure.

## Pourquoi le nombre de qubits ne dit plus rien

Un processeur « de 408 qubits logiques » n'existe pas : ce qui existe, c'est un décodeur capable de traiter les syndromes d'un circuit de cette taille, simulé. La distinction n'est pas sémantique. Un qubit logique est une **unité protégée**, construite à partir de nombreux qubits physiques, et son taux d'erreur dépend de la distance du code et de la qualité des opérations.

La conséquence pratique est qu'un annonceur peut afficher un chiffre spectaculaire sans qu'aucun algorithme ne tourne : il suffit de simuler le contrôle classique. Ce qui compterait, et qui n'est pas encore publié par ces acteurs, c'est un taux d'erreur logique **mesuré sur matériel**, à une distance de code déclarée, avec assez de qubits logiques pour exécuter un calcul utile.

## Les verrous

**La post-sélection.** Écarter 0,5 % des exécutions fait passer le taux d'erreur logique de 9,3 × 10⁻⁵ à 1,9 × 10⁻⁵. La méthode est légitime, mais le chiffre ne décrit pas la même chose que celui obtenu sans filet.

**Le décodage.** Le décodeur doit consommer les syndromes plus vite que la machine ne les produit. IonQ mesure 0,02 % de surcoût, mais sur des circuits simulés et avec une architecture logicielle propriétaire.

**La cryogénie.** Les qubits supraconducteurs fonctionnent près du zéro absolu, dans un **cryostat** — une enceinte réfrigérée dont la complexité croît avec le nombre de qubits à câbler. C'est une contrainte d'ingénierie qui limite la taille des machines autant que la physique.

**La perte photonique.** Côté photonique, la lumière s'atténue à chaque composant : c'est pourquoi Xanadu affiche un objectif de perte avant un objectif de qubits.

## Ce que l'argent achète

C'est la partie la plus commentée de l'année, et la moins déterminante pour comprendre la technologie. Le 8 septembre, le Département du Commerce américain a finalisé trois attributions de 100 millions de dollars au titre du CHIPS and Science Act, au bénéfice de Quantinuum, D-Wave et Rigetti. Ce que cet argent achète est précis : des briques de fabrication — photonique à faible perte et semi-conducteurs cryogéniques, procédés semi-conducteurs, électronique de lecture miniaturisée et architecture de cryostat.[^5][^6][^7]

En contrepartie, l'État fédéral obtient une participation minoritaire non contrôlante au capital — documentée par une source primaire pour Rigetti seulement, rapportée par la presse pour les deux autres.[^7] Un second signal, plus révélateur, vient d'IonQ : sa prévision de chiffre d'affaires 2026, relevée à 450-460 millions de dollars après l'acquisition de SkyWater, provient essentiellement de la fonderie et des composants, non du calcul quantique.[^8]

## Ce que l'on ne sait pas

- **Le record de Quantinuum est auto-déclaré** : l'entreprise indique elle-même que la qualification repose sur une étude de la littérature existante.
- **Les résultats d'IonQ viennent d'une prépublication** (arXiv:2608.25027) déposée par l'entreprise, et portent sur des circuits **simulés** : ils mesurent le décodeur, pas la machine.
- **Le nombre de qubits physiques par qubit logique n'est pas publié** dans les sources consultées : impossible de calculer le coût matériel réel de Helix ou du décodeur d'IonQ.
- **La feuille de route de Xanadu est un document d'entreprise**, assorti de ses propres avertissements sur les risques, et non un résultat évalué.
- **La participation au capital n'est documentée par une source primaire que pour Rigetti** ; le montant exact, la durée et les droits conférés ne sont pas publics.
- **La répartition du chiffre d'affaires d'IonQ** entre fonderie, composants et calcul est une lecture de presse : le communiqué ne publie pas ce découpage.
- **Aucune de ces mesures n'a été répliquée indépendamment** : ni Helix, ni le décodeur d'IonQ, ni les paliers de Xanadu.

[^1]: Quantinuum, « Helix: a new architecture for enterprise-scale fault-tolerant quantum computing » — https://www.quantinuum.com/blog/helix-a-new-architecture-for-enterprise-scale-fault-tolerant-quantum-computing

[^2]: IonQ, « IonQ demonstrates industry's first end-to-end real-time quantum error decoder » — https://www.ionq.com/news/ionq-demonstrates-industrys-first-end-to-end-real-time-quantum-error-decoder — prépublication : arXiv:2608.25027 — https://arxiv.org/abs/2608.25027

[^3]: Xanadu, feuille de route « over 1 000 logical qubits by 2031 » — https://investors.xanadu.ai/news-releases/news-release-details/xanadu-charts-path-over-1000-logical-qubits-2031

[^4]: Xanadu, « Xanadu and GlobalFoundries announce strategic partnership » — https://investors.xanadu.ai/news-releases/news-release-details/xanadu-and-globalfoundries-announce-strategic-partnership

[^5]: NIST / Département du Commerce américain, « finalization of CHIPS R&D award to Quantinuum » — https://www.nist.gov/news-events/news/2026/09/department-commerce-announces-finalization-chips-rd-award-quantinuum

[^6]: NIST / Département du Commerce américain, « finalization of CHIPS R&D award to D-Wave » — https://www.nist.gov/news-events/news/2026/09/department-commerce-announces-finalization-chips-rd-award-d-wave

[^7]: Rigetti Computing, « Rigetti signs definitive agreement for $100M US government award » — https://investors.rigetti.com/news-releases/news-release-details/rigetti-signs-definitive-agreement-100m-us-government-accelerate

[^8]: IonQ, « IonQ announces increased full-year 2026 financial outlook following SkyWater acquisition » — https://www.ionq.com/news/ionq-announces-increased-full-year-2026-financial-outlook-following-skywater-acquisition
