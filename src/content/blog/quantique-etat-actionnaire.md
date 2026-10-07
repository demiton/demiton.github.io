---
title: "Quantique : quand l'État américain devient actionnaire"
description: "300 millions de dollars attribués le même jour à Quantinuum, D-Wave et Rigetti, avec une participation fédérale au capital : l'informatique quantique change de nature de financement."
date: 2026-10-07
category: Technologies disruptives
tags: [quantique, chips-act, correction-derreur, politique-industrielle]
cover: /covers/quantique.svg
---

Le 8 septembre 2026, le Département du Commerce américain a finalisé trois attributions de 100 millions de dollars chacune au titre du CHIPS and Science Act, au bénéfice de Quantinuum, D-Wave et Rigetti. Le montant n'est pas l'information principale : pour la première fois, l'État fédéral ne se contente pas de commander des machines, il **entre au capital** des entreprises qui les construisent. La filière quantique change de nature de financement — et, dans le même mouvement, de ligne de front technique : ce qui se joue désormais n'est plus le nombre de qubits, mais la capacité à corriger leurs erreurs.

## L'essentiel

- **100 millions de dollars chacun**, attribués le même jour à Quantinuum, D-Wave et Rigetti au titre du CHIPS and Science Act.[^1][^2][^3]
- En contrepartie, l'État fédéral obtient une **participation minoritaire non contrôlante au capital** des trois sociétés.[^3]
- **Quantinuum valide l'architecture Helix** : 4,6 × 10⁻⁵ d'erreur par qubit et par cycle, sans post-sélection. Un record **auto-déclaré**.[^4]
- **IonQ décode les erreurs en temps réel sur un processeur central ordinaire** : jusqu'à 408 qubits logiques sur 88 blocs mémoire, pour 0,02 % de surcoût. **Prépublication non évaluée par les pairs**.[^5]
- **Xanadu transfère sa photonique sur une ligne de 300 mm** de GlobalFoundries, à Malte (New York).[^6]
- IonQ relève sa prévision de chiffre d'affaires 2026 à **450-460 millions de dollars**, dont l'essentiel ne vient pas du calcul quantique.[^7]

## Un État actionnaire, pas seulement client

Les trois attributions financent des briques industrielles concrètes. Quantinuum, spécialiste des ions piégés, finance des moyens de fabrication : photonique intégrée à faible perte, semi-conducteurs cryogéniques. D-Wave cible les procédés semi-conducteurs pour le recuit et le modèle à portes supraconducteur. Rigetti poursuit trois projets : électronique de lecture miniaturisée, nouvelle architecture de **cryostat** — l'enceinte qui maintient la puce près du zéro absolu, sans quoi un circuit supraconducteur ne fonctionne pas — et puces à forte connectivité.[^1][^2][^3]

Ce qui change n'est pas le montant, mais la position de l'État : une subvention finance un programme, une participation au capital l'installe au bilan. Le communiqué de Rigetti mentionne explicitement cette prise de participation minoritaire non contrôlante ; la presse financière rapporte le même dispositif pour les deux autres.[^3]

> **En clair**
> Une **participation minoritaire non contrôlante** signifie que l'État détient une part du capital sans diriger l'entreprise : il ne nomme pas la direction.

La conséquence est double : les marchés publics américains intégreront une préférence nationale, comme dans la défense ou le spatial, et le quantique cesse d'être un pari de capital-risque pour devenir une politique industrielle.

## La correction d'erreur est devenue la ligne de front

Un qubit ne se comporte pas comme un bit ordinaire : il ne se copie pas et perd son état à la moindre perturbation. Tant que les qubits physiques se trompent souvent, en empiler davantage ne donne pas un ordinateur utilisable. La réponse tient en un mot — corriger.

> **En clair**
> Un **qubit physique** est un objet fabriqué, ion piégé ou circuit supraconducteur : il est fragile et se trompe régulièrement. Un **qubit logique** n'est pas un qubit de plus, c'est un groupe de qubits physiques dont les erreurs sont corrigées collectivement pour qu'il se comporte comme une unité fiable. La **correction d'erreur** est ce travail permanent de regroupement et de mesure.

<figure>
	<img src="/figures/correction-erreur.svg" alt="À gauche, une vingtaine de qubits physiques dont cinq en rouge ; au centre, une flèche « correction d'erreur » ; à droite, trois qubits logiques en violet, chacun entouré des qubits physiques qui le composent" />
	<figcaption>La correction d'erreur ne supprime pas les qubits fragiles : elle les regroupe en unités protégées. Le schéma illustre le principe, pas les proportions réelles — un qubit logique peut mobiliser bien davantage de qubits physiques.</figcaption>
</figure>

Quantinuum a annoncé le 8 septembre avoir validé, sur son matériel Helios, l'architecture Helix, construite en concaténant deux codes correcteurs notés [[10,2,3]] et [[4,2,2]] — un code étant la règle qui permet de détecter et de corriger les erreurs d'un groupe de qubits. La société revendique un taux d'erreur de 4,6 × 10⁻⁵ par qubit et par cycle sans post-sélection, et un taux d'erreur logique par bloc de 9,3 × 10⁻⁵, ramené à 1,9 × 10⁻⁵ avec 0,5 % de post-sélection.[^4]

> **En clair**
> La **post-sélection** consiste à écarter après coup les exécutions dont on sait qu'elles ont mal tourné, pour ne garder que les bonnes. C'est courant en laboratoire, mais cela consomme du temps de calcul réel : un résultat annoncé « sans post-sélection » est donc plus exigeant qu'un résultat annoncé « avec ».

Cette revendication de record mondial est une **auto-évaluation** : Quantinuum précise lui-même qu'elle repose sur « une étude de la littérature existante », et aucune instance indépendante n'a homologué la comparaison. Ce qui reste solide, c'est le déplacement de la métrique — ce n'est plus le nombre de qubits qui départage les acteurs, mais le volume de calcul nécessaire pour obtenir un résultat fiable.[^4]

## IonQ ramène le décodage sur un processeur ordinaire

Corriger une erreur quantique suppose de lire l'état des qubits, d'en déduire ce qui a mal tourné, puis d'appliquer la correction — en temps réel, sans ralentir le calcul plus qu'on ne le répare. L'objection classique : ce **décodage** finirait par exiger des grappes de calcul classique si lourdes que la montée en puissance deviendrait absurde.

IonQ affirme avoir démontré le premier décodeur de bout en bout fonctionnant en temps réel sur un processeur central standard du commerce, avec une architecture à double décodeur. Les circuits évalués vont jusqu'à 408 qubits logiques répartis sur 88 blocs mémoire, soit plus de 31,5 millions d'opérations quantiques, pour un surcoût de décodage de 0,02 % du temps d'exécution.[^5]

Là encore, le qualificatif compte : ces chiffres viennent d'une **prépublication arXiv déposée par l'entreprise**, non d'un article évalué par les pairs. Ils disent une direction, pas un résultat répliqué. Mais si le coût classique n'explose pas avec la taille du système, le coût marginal de la montée en puissance change d'ordre de grandeur.[^5]

## Xanadu installe la photonique sur une ligne de 300 mm

> **En clair**
> La **photonique** porte l'information avec de la lumière — des photons — plutôt qu'avec des courants électriques. Une **ligne de 300 mm** est le standard de production des puces modernes : des plaquettes de silicium de 30 centimètres de diamètre, gravées par milliers à la fois. Y passer, c'est quitter le prototype de laboratoire pour la production de volume.

Le 6 octobre, Xanadu a annoncé un partenariat pluriannuel avec GlobalFoundries pour produire à grande échelle les composants photoniques de ses ordinateurs quantiques. L'accord porte sur le transfert, vers la ligne 300 mm de GlobalFoundries à Malte (New York), des détecteurs supraconducteurs à nanofils et d'une plateforme de nitrure de silicium à très faible perte. L'objectif affiché est de servir de base de fabrication aux démonstrateurs tolérants aux fautes et à de futurs « data centers quantiques ».[^6]

Le raisonnement est celui des attributions CHIPS : ce qui manque à la filière n'est pas une idée, mais une capacité de production — et un accès verrouillé à une fonderie de 300 mm est une barrière à l'entrée difficilement réplicable.[^6]

## Le chiffre d'affaires quantique qui n'en est pas

Reste un signal moins confortable. Le 8 septembre également, IonQ a relevé sa prévision de chiffre d'affaires 2026 à 450-460 millions de dollars, en intégrant SkyWater Technology à compter du 31 juillet 2026, date de son acquisition, nettes des revenus internes.[^7]

Or l'essentiel de ce chiffre d'affaires provient de la fonderie et des composants, non du calcul quantique — une décomposition issue de l'analyse de presse, le communiqué ne publiant pas ce découpage. Le fait mérite d'être souligné : la consolidation verticale du secteur se finance par des revenus qui ne sont pas quantiques, ce qui signale à la fois une stratégie industrielle cohérente et la fragilité, à ce stade, de la thèse de revenus purement quantiques.

## Ce que l'on ne sait pas

- **La participation au capital n'est documentée par une source primaire que pour Rigetti** : son communiqué la mentionne explicitement. Pour D-Wave et Quantinuum, elle repose sur des reprises de presse, sans communiqué équivalent consulté.
- **Le record de Quantinuum est auto-déclaré** : l'entreprise indique elle-même que la qualification repose sur une étude de la littérature existante du domaine.
- **Les résultats d'IonQ viennent d'une prépublication arXiv** de l'entreprise : 408 qubits logiques, 31,5 millions d'opérations et 0,02 % de surcoût sont des chiffres non répliqués.
- **La répartition du chiffre d'affaires d'IonQ** entre fonderie, composants et calcul quantique est une lecture de presse : le communiqué ne publie pas ce découpage.
- **Le montant exact de la participation fédérale, sa durée et les droits qu'elle confère** ne sont pas publics.

[^1]: NIST / Département du Commerce américain, « Department of Commerce announces finalization of CHIPS R&D award to Quantinuum » — https://www.nist.gov/news-events/news/2026/09/department-commerce-announces-finalization-chips-rd-award-quantinuum

[^2]: NIST / Département du Commerce américain, « Department of Commerce announces finalization of CHIPS R&D award to D-Wave » — https://www.nist.gov/news-events/news/2026/09/department-commerce-announces-finalization-chips-rd-award-d-wave

[^3]: Rigetti Computing, « Rigetti signs definitive agreement for $100M US government award » — https://investors.rigetti.com/news-releases/news-release-details/rigetti-signs-definitive-agreement-100m-us-government-accelerate

[^4]: Quantinuum, « Helix: a new architecture for enterprise-scale fault-tolerant quantum computing » — https://www.quantinuum.com/blog/helix-a-new-architecture-for-enterprise-scale-fault-tolerant-quantum-computing

[^5]: IonQ, « IonQ demonstrates industry's first end-to-end real-time quantum error decoder » — https://www.ionq.com/news/ionq-demonstrates-industrys-first-end-to-end-real-time-quantum-error-decoder

[^6]: Xanadu, « Xanadu and GlobalFoundries announce strategic partnership » — https://investors.xanadu.ai/news-releases/news-release-details/xanadu-and-globalfoundries-announce-strategic-partnership

[^7]: IonQ, « IonQ announces increased full-year 2026 financial outlook following SkyWater acquisition » — https://www.ionq.com/news/ionq-announces-increased-full-year-2026-financial-outlook-following-skywater-acquisition
