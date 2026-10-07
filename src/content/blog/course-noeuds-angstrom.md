---
title: "Course aux nœuds angstrom : qui fabrique vraiment les puces les plus avancées"
description: "TSMC vise 120 000 plaquettes par mois en 2 nm et a lancé le pilote de son A14 ; Intel revendique 80 % de rendement sur son 18A, mais reste mesuré au niveau du N3E. Où passe réellement la frontière."
date: 2026-10-07
category: Semi-conducteurs
tags: [semi-conducteurs, tsmc, intel, lithographie, euv]
cover: /covers/noeuds-angstrom.svg
---

En quelques semaines, la course aux procédés les plus avancés a livré trois repères : TSMC a lancé le pilote de son A14 et relevé sa cadence en 2 nm, Intel a revendiqué 80 % de rendement sur son 18A, et ASML a posé avec ses clients le calendrier de la lithographie suivante. Une mesure indépendante est venue cadrer la lecture : en densité, l'18A d'Intel se situe au niveau du N3E de TSMC, pas du N2.

## L'essentiel

- **TSMC viserait 120 000 plaquettes par mois en 2 nm fin 2026**, contre 20 000 fin juillet.
- **L'A14 (1,4 nm) est entré en pilote** : production à risque en 2027, volume en 2028.
- **L'A16 (1,6 nm)**, premier nœud TSMC à alimentation par l'arrière destiné au volume, viserait une production de masse au quatrième trimestre 2026 — sans communiqué du fondeur.
- **Intel revendique 80 % de rendement sur son 18A**, mais un teardown indépendant le mesure au niveau du N3E de TSMC.
- **Le High-NA n'entrera en production de volume qu'en 2030** chez TSMC ; Samsung vise la DRAM d'ici 2028.

## Ce qu'est un nœud, et ce qu'il n'est plus

Un **nœud** désigne une génération de recettes industrielles : largeur des motifs gravés, matériaux, transistors, interconnexions. Son nom correspondait autrefois à une dimension mesurable ; les « 2 nm », « 1,6 nm » et « 1,4 nm » sont aujourd'hui des noms commerciaux. Un nanomètre vaut dix ångströms, et c'est cette unité que les fondeurs emploient pour suggérer une rupture.

> **En clair**
> « 2 nm » ne signifie pas qu'un transistor mesure 2 nanomètres : deux nœuds de même nom peuvent avoir des **densités logiques** différentes — le nombre de transistors par millimètre carré. Densité, consommation à fréquence égale et rendement départagent les générations, pas l'étiquette.

La capacité se compte en **plaquettes par mois** : la plaquette est le disque de silicium où l'on grave des centaines de puces. 120 000 par mois, c'est environ quatre par minute, en continu.

## TSMC : quatre générations en parallèle

TSMC n'arrête pas un nœud quand le suivant arrive, il les empile : au deuxième trimestre 2026, le N2 ne représentait que 3 % de son chiffre d'affaires, contre 30 % pour le N3 et 33 % pour le N5. La montée en cadence du 2 nm est néanmoins rapide — de 20 000 plaquettes par mois fin juillet à 120 000 visées fin 2026 — et le nombre de **tape-outs** serait quatre fois supérieur à celui du N3 au même stade.[^1]

> **En clair**
> Un **tape-out** est le moment où un client fige le dessin d'une puce et le confie à la fonderie, qui grave un premier jeu de plaquettes pour vérifier que le procédé tient.

L'**A16**, premier nœud TSMC à **alimentation par l'arrière** destiné à la production de masse, aurait achevé sa vérification pour une production visée au quatrième trimestre 2026 ; NVIDIA aurait réservé de la capacité en 1,6 nm pour sa génération de GPU suivante.[^2] L'**A14** est entré en pilote en septembre, avec une production à risque en 2027 — des plaquettes vendues avant validation complète du procédé — et un volume en 2028. TSMC revendique +15 % de fréquence à puissance égale, ou −30 % de puissance, et +20 % de densité logique par rapport au N2.[^3] Ces gains sont **auto-déclarés**.

> **En clair**
> L'**alimentation par l'arrière** fait passer le courant par la face arrière de la puce plutôt que par le dessus, déjà encombré par le routage du signal : densité et consommation s'améliorent ensemble.

<figure>
	<img src="/figures/frise-noeuds.svg" alt="Frise 2025-2028 comparant les nœuds de TSMC (N3E, N2, A16, A14) et d'Intel (18A, 14A), avec un trait jaune marquant l'équivalence de densité entre l'18A et le N3E" />
	<figcaption>Les barres indiquent l'entrée en production et sa poursuite ; les pointillés, un pilote ou une production à risque. Le trait jaune matérialise l'écart qui compte : en densité, l'18A d'Intel est mesuré au niveau du N3E de TSMC, pas du N2.</figcaption>
</figure>

## Intel : le rendement progresse, la densité non

Le 18A a franchi une étape industrielle : le rendement de la puce de calcul de Panther Lake, premier produit commercial à combiner transistors RibbonFET à grille enveloppante et alimentation par l'arrière (PowerVia), atteindrait environ 80 % sur une surface de 114 mm².[^4] Ces chiffres viennent d'un analyste et n'ont pas été confirmés par Intel.

> **En clair**
> Le **rendement** est la part de puces fonctionnelles sur une plaquette. 80 % sur une petite puce ne dit rien de l'économie d'une grosse : plus la surface croît, plus les défauts par puce se multiplient.

Car c'est là que le bât blesse. Un **teardown** — démontage et mesure d'une puce réelle — conclut que la logique 18A est proche en densité du N3E de TSMC, sans dépasser le N3P, le N2 ni le SF2 de Samsung.[^5] Intel a donc rattrapé une génération, pas comblé l'écart.

Le fondeur vise la suivante : Naga Chandrasekaran, patron d'Intel Foundry, attend son 14A « à moins de 5 % » de l'A14 de TSMC, avec une production à risque au second semestre 2027 et un volume en 2028.[^6] Le périmètre de ces « 5 % » n'est pas précisé, et il s'agit d'un objectif, pas d'un résultat.

## La lithographie : le prochain outil n'arrivera pas avant 2030

Graver des motifs plus fins dépend d'un seul fournisseur d'équipements, ASML, et de sa lithographie **EUV**, qui utilise un rayonnement ultraviolet extrême pour dessiner les circuits. La génération suivante, dite **High-NA** — grande ouverture numérique, donc une optique capable de résoudre des motifs plus petits —, se prépare sans bouleverser le calendrier.

Le 8 septembre, ASML et TSMC ont annoncé une initiative commune pour faire passer l'industrie des **photomasques** EUV du format 6 pouces au format 12 pouces ; TSMC prévoit le High-NA en production de volume à partir de 2030, une ligne pilote de masques 12 pouces en 2031 et la production des systèmes High-NA 12 pouces en 2033.[^7] Le même jour, Samsung a annoncé rejoindre l'initiative et viser le High-NA en production de masse DRAM « pour la première fois dans l'industrie » d'ici 2028.[^8]

> **En clair**
> Un **photomasque** est le calque modèle dont la lumière projette le dessin du circuit sur la plaquette. Le format 12 pouces lève la contrainte de **stitching** — assembler plusieurs expositions pour couvrir une puce — et améliore la productivité des scanners, donc le coût par puce.

Le High-NA ne sera donc pas un levier de coût avant la prochaine décennie, ce qui protège la valeur du parc Low-NA déjà installé.

## Fabriquer aux États-Unis : des projets, pas de calendrier

La souveraineté industrielle avance plus lentement que les nœuds. TSMC étudierait un second campus américain, de six usines avancées, probablement à Dallas, pour un montant pouvant dépasser les 265 milliards de dollars déjà engagés en Arizona ; l'information, rapportée par l'Economic Daily News taïwanais, a été confirmée par Reuters sur la base de deux sources.[^9] TSMC n'a pas commenté et son conseil n'a pas validé.

Plus spéculatif : une coentreprise avec Terafab, le projet de fabrication d'Elon Musk, qui apporterait financement, participation et engagements d'achat, pour regrouper logique, mémoire, packaging, test et masques sur un même site ; Intel y est déjà partenaire, avec Tesla comme premier client 14A.[^10] Aucun communiqué de TSMC n'accompagne ces discussions.

## Ce que l'on ne sait pas

- **L'A16 repose sur une source unique** : une synthèse d'investisseur s'appuyant sur des médias taïwanais, sans communiqué de TSMC.[^2]
- **Les 120 000 plaquettes par mois du N2 viennent de la presse taïwanaise**, reprise par un seul média spécialisé, sans recoupement indépendant.[^1]
- **Le rendement de 80 % du 18A est une estimation d'analyste**, non confirmée par Intel.[^4]
- **La comparaison de densité entre 18A et N2 est contestée** : le teardown a été relayé, pas lu intégralement, et sa lecture du rapport performance/consommation est disputée.
- **Le « moins de 5 % » du 14A n'a pas de périmètre défini** — fréquence, consommation ou densité ?[^6]
- **Le campus texan et Terafab restent des projets** sans validation du conseil ni communiqué ; le High-NA en DRAM chez Samsung en 2028 est une annonce, pas une capacité démontrée.

[^1]: TechPowerUp (d'après UDN), « 2 nm: 120,000 wafers per month by end-2026 » — https://www.techpowerup.com/353153/tsmc-to-scale-2-nm-production-to-120-000-wafers-per-month-by-the-end-of-2026
[^2]: Börse Express, « TSMC-Aktie: A16-Prozess für Q4 2026 freigegeben » — https://www.boerse-express.com/news/articles/tsmc-aktie-a16-prozess-fuer-q4-2026-freigegeben-943284
[^3]: TechPowerUp (d'après UDN), « TSMC begins A14 pilot production » — https://www.techpowerup.com/353087/tsmc-begins-a14-pilot-production-risk-production-next-year
[^4]: TechPowerUp, « Panther Lake hits 80% yield on 18A » — https://www.techpowerup.com/352724/intel-panther-lake-hits-80-yield-on-18a-node
[^5]: TechPowerUp (teardown SemiAnalysis), « Panther Lake teardown: 18A near N3E » — https://www.techpowerup.com/353161/panther-lake-teardown-shows-intel-18a-near-tsmc-n3e-newer-tsmc-nodes-still-ahead
[^6]: TechPowerUp, « Intel expects 14A within 5% of TSMC's A14 » — https://www.techpowerup.com/353094/intel-expects-14a-node-to-be-within-5-of-tsmcs-a14
[^7]: TechPowerUp (communiqué ASML/TSMC), « 12-inch photomasks for High-NA EUV » — https://www.techpowerup.com/352471/tsmc-and-asml-announce-initiative-to-pioneer-industry-transition-to-large-format-photomasks-for-high-na-euv
[^8]: TechPowerUp (communiqué Samsung/ASML), « Samsung and ASML expand collaboration » — https://www.techpowerup.com/352472/samsung-electronics-and-asml-expand-collaboration-for-next-generation-semiconductor-manufacturing
[^9]: TechPowerUp (d'après UDN et Reuters), « TSMC reportedly evaluating Texas expansion » — https://www.techpowerup.com/353281/tsmc-reportedly-evaluating-texas-expansion-besides-usd-265-billion-arizona-plan
[^10]: TechPowerUp (citant Culpium), « TSMC explores collaboration with Terafab » — https://www.techpowerup.com/353352/tsmc-explores-collaboration-with-elon-musks-terafab-project
