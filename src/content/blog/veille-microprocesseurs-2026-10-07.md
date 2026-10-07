---
title: "Veille microprocesseurs — édition du 7 octobre 2026"
description: "Mémoire sous tension jusqu'en 2028, nœuds angstrom qui glissent à 2028-2030, contrôles à l'export qui s'effritent : ce qui a bougé dans les puces entre le 8 septembre et le 7 octobre 2026."
date: 2026-10-07
category: Veille
tags: [veille, semi-conducteurs, microprocesseurs, tsmc, mémoire]
cover: /covers/veille-microprocesseurs.svg
---

Le mois écoulé ne raconte pas une percée, mais un déplacement de contrainte : la logique de pointe reste hors d'atteinte pour quiconque n'est pas TSMC, et le goulot de l'infrastructure d'IA s'est déplacé vers la **mémoire**. Dans le même temps, la Chine a continué de rogner l'effet des contrôles à l'export, non par une annonce spectaculaire mais par une accumulation de signaux industriels.

Cette édition couvre la période du **8 septembre au 7 octobre 2026**. Deux faits antérieurs sont conservés comme rappels de contexte (Vera Rubin, qualification HBM4) et signalés comme tels.

## Ce qu'il faut retenir

- **La mémoire est devenue le premier facteur limitant** de l'infrastructure d'IA, avant la logique : Micron annonce une tension « nettement plus forte » en 2027-2028, plus de 75 % de sa production 2027 est déjà engagée, et les prix contractuels DRAM/NAND du quatrième trimestre repartent à la hausse.
- **La frontière des nœuds s'est décalée à 2028-2030.** TSMC vise 120 000 plaquettes/mois en N2 fin 2026 et a lancé le pilote A14 ; Intel reste, selon les mesures publiées, au niveau du N3E avec son 18A.
- **Le High-NA EUV ne pèsera pas sur les coûts avant 2030-2033** : TSMC et ASML organisent la transition vers les masques 12 pouces, avec une production de volume annoncée pour 2033.
- **Les contrôles à l'export perdent en efficacité** : une DUV chinoise est en test chez SMIC, et des capitaux d'État auraient financé des serveurs susceptibles d'embarquer des puces interdites.
- **Les hausses de prix remontent toute la chaîne** : CPU Intel, DRAM, NAND, plaquettes TSMC (+3 à 6 % en janvier 2027), serveurs — le coût de l'IA se transfère progressivement au client final.

## Fonderie : la frontière se décale, TSMC reste seul en tête

### TSMC achève la vérification de l'A16 et vise la production de masse au quatrième trimestre 2026

**30 août 2026** — source : [Börse Express](https://www.boerse-express.com/news/articles/tsmc-aktie-a16-prozess-fuer-q4-2026-freigegeben-943284) — impact **majeur** · confiance : rapporté

Le procédé A16 (1,6 nm, avec alimentation par l'arrière) serait développé et vérifié, la production de masse étant visée au quatrième trimestre 2026. NVIDIA aurait déjà réservé des capacités pour sa génération de GPU suivante, « Feynman ». La même source rapporte un budget d'investissement 2026 relevé de 52–56 à 60–64 milliards de dollars, dont 70 à 80 % vers les procédés avancés.

**Enjeu.** L'A16 est le premier nœud TSMC à alimentation par l'arrière destiné au volume : il conditionne la feuille de route de NVIDIA au-delà de Rubin. La réservation anticipée verrouille la capacité et concentre davantage la dépendance de l'industrie sur un fondeur unique, à Taïwan.

### TSMC et ASML lancent la transition vers les photomasques 12 pouces en High-NA EUV

**8 septembre 2026** — source : [TechPowerUp (communiqué ASML/TSMC)](https://www.techpowerup.com/352471/tsmc-and-asml-announce-initiative-to-pioneer-industry-transition-to-large-format-photomasks-for-high-na-euv) — impact **majeur** · confiance : confirmé

Annoncée la veille de la conférence SPIE BACUS, l'initiative commune vise à faire passer l'industrie du masque EUV du format 6 pouces au 12 pouces. TSMC prévoit d'utiliser le High-NA en production de volume sur les nœuds avancés à partir de 2030, avec une ligne pilote de masques 12 pouces en 2031 et l'entrée en production des systèmes High-NA 12 pouces en 2033.

**Enjeu.** Le format 12 pouces lève la contrainte de « stitching » et améliore la productivité des scanners, donc le coût par puce des nœuds angstrom. La date de 2033 signifie que le High-NA ne sera pas un levier de coût avant la prochaine décennie — ce qui sécurise la durée de vie du parc Low-NA installé, et la position d'ASML.

### Samsung introduira le High-NA EUV en DRAM d'ici 2028

**8 septembre 2026** — source : [TechPowerUp (communiqué Samsung/ASML)](https://www.techpowerup.com/352472/samsung-electronics-and-asml-expand-collaboration-for-next-generation-semiconductor-manufacturing) — impact **notable** · confiance : confirmé

Samsung rejoint l'initiative des masques 12 pouces et prévoit d'introduire le High-NA EUV en production de masse DRAM « pour la première fois dans l'industrie » d'ici 2028.

**Enjeu.** C'est le premier usage annoncé du High-NA en mémoire, alors que toute la chaîne IA dépend du scaling DRAM via le HBM. Cela crée aussi un second client High-NA à côté de TSMC et Intel, ce qui réduit le risque commercial d'ASML sur cette plateforme.

### TSMC vise 120 000 plaquettes/mois en N2 fin 2026

**28 septembre 2026** — source : [TechPowerUp (d'après UDN)](https://www.techpowerup.com/353153/tsmc-to-scale-2-nm-production-to-120-000-wafers-per-month-by-the-end-of-2026) — impact **majeur** · confiance : rapporté

TSMC relèverait sa cible de capacité 2 nm à environ 120 000 plaquettes par mois fin 2026, contre 100 000 annoncées début août et 20 000 atteintes fin juillet. Le N2 compterait quatre fois plus de « tape-outs » que le N3 au même stade. Au deuxième trimestre 2026, le N2 ne représentait encore que 3 % du chiffre d'affaires de TSMC, contre 30 % pour le N3 et 33 % pour le N5.

**Enjeu.** La vitesse de montée en cadence du N2 détermine la disponibilité des GPU d'IA, des CPU serveur et des puces mobiles de 2027. Une montée en cadence de six fois en cinq mois illustre aussi la pression capitalistique qui rend l'entrée sur les nœuds avancés quasi impossible pour de nouveaux acteurs.

### TSMC démarre la production pilote de l'A14, volume visé en 2028

**25 septembre 2026** — source : [TechPowerUp (d'après UDN)](https://www.techpowerup.com/353087/tsmc-begins-a14-pilot-production-risk-production-next-year) — impact **notable** · confiance : rapporté

Les premières plaquettes pilotes A14 (1,4 nm) auraient été lancées à Baoshan Fab 20 (Hsinchu) et Fab 25 (centre de Taïwan). Si les rendements tiennent, la production à risque est prévue en 2027 et le volume en 2028. TSMC revendique jusqu'à +15 % de fréquence à puissance égale, ou −30 % de puissance à fréquence égale, et +20 % de densité logique par rapport au N2 ; le High-NA ne serait adopté que vers 1 nm.

**Enjeu.** L'A14 place TSMC légèrement devant Intel (14A en risque au second semestre 2027) et Samsung. Elle confirme aussi que TSMC compte tirer le maximum du Low-NA EUV, ce qui protège ses coûts et son parc installé face au High-NA.

### Panther Lake atteint environ 80 % de rendement sur Intel 18A

**15 septembre 2026** — source : [TechPowerUp](https://www.techpowerup.com/352724/intel-panther-lake-hits-80-yield-on-18a-node) — impact **notable** · confiance : rapporté

Le rendement de la puce de calcul Panther Lake en 18A (surface d'environ 114 mm²) serait d'environ 80 %, avec un objectif d'environ 40 000 plaquettes/mois en 18A fin 2026, 60 000 fin 2027 et 80 000 en 2028. Les chiffres proviennent d'un analyste (Jeff Pu, GF Securities) et n'ont pas été confirmés par Intel.

**Enjeu.** La crédibilité d'Intel Foundry comme seconde source occidentale dépend de ces rendements. Un rendement élevé sur une petite puce ne dit cependant rien de la densité ni du coût, qui sont les vrais critères de choix d'un client.

### Le teardown de Panther Lake place l'18A au niveau du N3E, pas du N2

**28 septembre 2026** — source : [TechPowerUp (teardown SemiAnalysis)](https://www.techpowerup.com/353161/panther-lake-teardown-shows-intel-18a-near-tsmc-n3e-newer-tsmc-nodes-still-ahead) — impact **majeur** · confiance : rapporté

L'analyse de la puce conclut que la logique 18A est proche en densité du N3E de TSMC (environ +18,6 % par rapport à Intel 3) mais ne dépasse ni le N3P, ni le N2, ni le SF2 de Samsung. Panther Lake reste le premier produit commercial à transistors RibbonFET et alimentation par l'arrière PowerVia.

**Enjeu.** Un 18A au niveau du N3E laisse TSMC seul sur la frontière jusqu'à l'A14 et le 14A, en 2028. Le risque de dépendance à un site unique, à Taïwan, reste donc entier pour toute l'industrie.

### Intel affirme que son 14A sera « à moins de 5 % » de l'A14 de TSMC

**25 septembre 2026** — source : [TechPowerUp](https://www.techpowerup.com/353094/intel-expects-14a-node-to-be-within-5-of-tsmcs-a14) — impact **notable** · confiance : rapporté

Naga Chandrasekaran, patron d'Intel Foundry, attend son 14A à moins de 5 % du nœud A14 de TSMC — sans préciser si le chiffre porte sur la fréquence, l'efficacité énergétique ou la densité. Intel prévoit une production à risque au second semestre 2027, un volume en 2028, +15 à 20 % de performance à puissance égale par rapport au 18A et jusqu'à +30 % de densité.

**Enjeu.** Si l'écart tient à 5 %, Intel redevient une alternative crédible pour les grands clients américains, ce qui est central dans la politique de réduction de dépendance de Washington. Il s'agit à ce stade d'un objectif déclaré, pas d'un résultat mesuré.

### TSMC évalue un second campus américain au Texas, au-delà des 265 milliards de l'Arizona

**30 septembre 2026** — source : [TechPowerUp (d'après UDN et Reuters)](https://www.techpowerup.com/353281/tsmc-reportedly-evaluating-texas-expansion-besides-usd-265-billion-arizona-plan) — impact **notable** · confiance : rapporté

Un projet de second campus américain de six fabs avancées, probablement à Dallas, pour un montant pouvant dépasser les 265 milliards de dollars déjà engagés en Arizona, est rapporté par l'Economic Daily News taïwanais et confirmé par Reuters sur la base de deux sources. Les plans ne sont pas finalisés et le conseil de TSMC n'a pas validé.

**Enjeu.** C'est le cœur de la souveraineté industrielle américaine : réduire la dépendance à Taïwan sans y déplacer la frontière technologique. Les contraintes déjà rencontrées en Arizona — électricité, eau, main-d'œuvre — pèsent sur la faisabilité.

### TSMC explore une collaboration avec le projet Terafab d'Elon Musk

**3 octobre 2026** — source : [TechPowerUp (citant Culpium)](https://www.techpowerup.com/353352/tsmc-explores-collaboration-with-elon-musks-terafab-project) — impact **à suivre** · confiance : rapporté

Selon la newsletter Culpium, reprise et confirmée sur X par Elon Musk, TSMC discuterait d'une coentreprise avec Terafab pour installer une fabrication avancée de bout en bout aux États-Unis, Terafab apportant le financement, une participation et des engagements d'achat. Le projet vise à regrouper logique, mémoire, packaging, test et masques sur un même site ; Intel y est déjà partenaire, avec Tesla comme premier client 14A.

**Enjeu.** Le montage ouvrirait une voie de double source américaine pour un client captif, ce qui pourrait redistribuer une partie de la demande de nœuds avancés hors d'Asie. Le calendrier et le modèle de licence des PDK restent entièrement indéterminés.

## Mémoire : le goulot s'installe jusqu'en 2028

### Micron annonce une mémoire « nettement plus tendue » en 2027 et 2028

**30 septembre 2026** — source : [TechPowerUp (résultats Micron)](https://www.techpowerup.com/353296/micron-ceo-says-memory-supply-will-be-much-tighter-in-2027-and-2028-than-in-2026) — impact **majeur** · confiance : rapporté

Sanjay Mehrotra, PDG de Micron, déclare que les conditions offre/demande de mémoire et de stockage seront « nettement plus tendues » sur les exercices 2027 et 2028 qu'en 2026, sans visibilité sur un retour à l'équilibre. Micron publie un chiffre d'affaires trimestriel record de 54,2 milliards de dollars, plus de 75 % de sa production 2027 est déjà engagée, les prix DRAM ont progressé de près de 20 % sur le trimestre et le NAND d'environ 30 %.

**Enjeu.** La mémoire devient le facteur limitant de l'infrastructure d'IA, avant la logique. Une tension qui dure jusqu'en 2028 renchérit serveurs, PC et smartphones, et transfère de la valeur des intégrateurs vers trois fournisseurs : Samsung, SK hynix et Micron.

### Les prix contractuels DRAM et NAND repartent à la hausse au quatrième trimestre

**6 octobre 2026** — source : [DigitalToday (citant TrendForce)](https://www.digitaltoday.co.kr/en/view/111830/ram-ssd-prices-us-cloud-demand-tightens-dram-supply) — impact **majeur** · confiance : rapporté

TrendForce indique que les négociations de prix contractuels DRAM du quatrième trimestre 2026 pointent vers des hausses, sur une offre « extrêmement tendue » et une demande soutenue des fournisseurs de cloud américains. Un responsable de YMTC estime que la pénurie mondiale de mémoire durera « au moins trois ans de plus » et indique que son entreprise a relevé ses prix et réorienté sa production vers les produits à plus forte marge.

**Enjeu.** La hausse simultanée DRAM et NAND renchérit le coût complet des systèmes d'IA et des terminaux, avec un effet d'éviction sur le grand public. L'alignement de YMTC sur une stratégie de marge affaiblit l'hypothèse d'un contre-pouvoir chinois aux prix.

### Les trois fournisseurs de HBM4 sont qualifiés pour Vera Rubin

**5 juin 2026 (rappel de contexte)** — sources : [EDaily](https://en.edaily.co.kr/news/eda202606055445/) et [Yonhap](https://en.yna.co.kr/view/AEN20260128002800320) — impact **majeur** · confiance : rapporté

Jensen Huang a indiqué que Samsung, SK hynix et Micron avaient tous réussi la qualification HBM4 pour Vera Rubin. Selon des sources citées par Yonhap, NVIDIA aurait alloué environ 70 % de sa demande HBM4 2026 à SK hynix ; Counterpoint estimait alors SK hynix à 54 % du marché HBM4, Samsung à 28 % et Micron à 18 %.

**Enjeu.** La qualification de trois fournisseurs réduit le risque d'approvisionnement de NVIDIA, mais concentre la valeur sur la Corée et les États-Unis. La part de SK hynix conditionne sa marge et sa capacité à financer ses fabs.

### Conflit social chez Micron à Taïwan : un vote de grève envisagé

**28 septembre 2026** — source : [Sourceability (citant Digitimes et TrendForce)](https://sourceability.com/post/labor-risks-deepen-semiconductor-shortage-strain-amid-ai-investments) — impact **à suivre** · confiance : rapporté

Le syndicat de Micron à Taïwan, qui revendique plus de 80 % de salariés syndiqués sur les sites de Taoyuan et Taichung, réclame un dispositif permanent de partage des profits à 15 % du résultat opérationnel ; un vote de grève était prévu début octobre après l'échec d'une médiation, une nouvelle réunion étant fixée au 22 octobre 2026. Les stocks DRAM sont à des niveaux historiquement bas.

**Enjeu.** Une grève sur des sites DRAM majeurs, dans un marché sans marge de manœuvre, serait un choc d'offre immédiat. Elle illustre la tension sociale créée par le transfert de la valeur vers les producteurs de mémoire.

## Demande : Rubin en volume, et des clients qui s'arment

### La plateforme NVIDIA Vera Rubin est en production

**5 janvier 2026 (rappel de contexte)** — source : [NVIDIA Newsroom](https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer) — impact **majeur** · confiance : confirmé

La plateforme Rubin compte six puces (Vera CPU, GPU Rubin, switch NVLink 6, SuperNIC ConnectX-9, DPU BlueField-4, switch Ethernet Spectrum-6) et un système rack NVL72 de 72 GPU et 36 CPU. NVIDIA revendique jusqu'à 10× de réduction du coût par token en inférence et 4× moins de GPU pour entraîner des modèles MoE que Blackwell ; le GPU Rubin délivre 50 pétaflops en NVFP4, NVLink 6 offre 3,6 To/s par GPU. La disponibilité chez les partenaires est annoncée pour le second semestre 2026.

**Enjeu.** Rubin est le débouché principal de la demande de logique de pointe et de HBM4, donc le point de fixation de toute la chaîne amont. La cadence annuelle imposée par NVIDIA contraint TSMC, les fabricants de mémoire et le packaging à un rythme d'investissement inédit.

### NVIDIA autorise 150 milliards de dollars de rachats d'actions supplémentaires

**28 septembre 2026** — source : [NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-announces-a-150-billion-share-repurchase-authorization-increase) — impact **notable** · confiance : confirmé

Le conseil d'administration a autorisé 150 milliards de dollars supplémentaires, portant le montant restant autorisé à 235 milliards, avec une exécution prévue jusqu'à l'exercice 2028. NVIDIA qualifie cette augmentation de « plus importante de l'histoire ».

**Enjeu.** Cette capacité signale une trésorerie exceptionnelle, et alimente le débat sur la soutenabilité du cycle d'investissement dans l'IA. Elle détourne des ressources internes d'investissements directs dans une chaîne d'approvisionnement dont la mémoire et le packaging sont les goulots.

### OpenAI approfondit sa coopération avec Samsung sur les puces de nouvelle génération

**9 septembre 2026** — source : [TrendForce (citant Reuters)](https://www.trendforce.com/news/2026/09/09/news-openai-says-it-is-working-with-samsung-on-next-gen-chips-ties-could-expand-beyond-memory/) — impact **notable** · confiance : rapporté

Harrison Kim, directeur général d'OpenAI Korea, fait état de progrès significatifs sur la production et la recherche des puces de nouvelle génération d'OpenAI, sans préciser le rôle de Samsung. La puce d'inférence Jalapeño, lancée en août avec Broadcom et fabriquée par TSMC en N3, utiliserait du HBM4 Samsung ; une deuxième génération est en développement avancé et une troisième en conception.

**Enjeu.** Un second grand concepteur de silicium d'IA, capable de capter de la capacité HBM4 et de la fonderie 2 nm, accroît la pression sur les nœuds avancés et fait de Samsung un point de passage hors de l'orbite NVIDIA/TSMC. Le risque est une fragmentation des rares capacités mémoire et logique entre davantage d'acteurs.

### TSMC publie un chiffre d'affaires d'août record, en hausse de 53,3 % sur un an

**10 septembre 2026** — source : [Newsis](https://www.newsis.com/view/NISX20260910_0003785044) — impact **notable** · confiance : rapporté

TSMC a déclaré 514,8 milliards de dollars taïwanais de chiffre d'affaires en août 2026, en hausse de 53,3 % sur un an et de 10,1 % sur un mois — un record mensuel, et un 32e mois consécutif de croissance annuelle. Le cumul janvier-août atteint 3 386,9 milliards de dollars taïwanais (+39,3 %). Le volume d'équipements de fabrication à acheter en 2026 aurait augmenté de 90 % par rapport aux prévisions de fin 2025.

**Enjeu.** Ces chiffres matérialisent le transfert de la demande d'IA vers la fonderie et la mémoire, et la dépendance croissante de l'écosystème à un fournisseur unique de nœuds avancés. La hausse des achats d'équipements est un indicateur avancé de la charge 2027-2028.

## Chine et contrôles à l'export : l'érosion par les faits

### Huawei orchestrerait l'industrialisation d'une DUV chinoise, testée chez SMIC

**8 septembre 2026** — source : [Yonhap (citant le Financial Times)](https://www.yna.co.kr/view/AKR20260908151800009) — impact **majeur** · confiance : rapporté

Selon le Financial Times, Huawei pilote l'autonomie chinoise en lithographie en investissant dans la chaîne des équipements DUV et en aidant les fournisseurs chinois à contracter avec SMIC et d'autres fondeurs. La start-up Yuliangsheng aurait co-développé avec SMEE le premier équipement DUV avancé chinois, actuellement en test chez SMIC et sur les lignes de Huawei, avec un objectif de douze machines produites d'ici fin 2026.

**Enjeu.** Si la DUV chinoise devient viable, les contrôles à l'exportation perdent une partie de leur efficacité sur les nœuds matures et intermédiaires, et la Chine desserre sa dépendance à ASML. Les rendements et la qualité optique restent les inconnues décisives.

### Des capitaux d'État chinois auraient financé l'achat de serveurs sous contrôle à l'export

**3 octobre 2026** — source : [YTN (citant Bloomberg)](https://www.ytn.co.kr/_ln/0104_202610030127515435) — impact **notable** · confiance : rapporté

À partir de documents déposés auprès des autorités chinoises, Bloomberg rapporte que Semi-Tech Rising Group — société liée au « Big Fund » puis détenue majoritairement par des gouvernements locaux — a financé l'achat de plus de 700 serveurs par Glory View Technology entre août 2025 et mai 2026. Un contrat mentionnerait 32 serveurs susceptibles d'embarquer des puces NVIDIA B300, interdites à l'export sans licence vers la Chine ; la plupart des machines auraient été installées dans un cluster de China Mobile au Ningxia.

**Enjeu.** Cela montre que les contrôles américains sont contournables via des circuits locaux et des financements publics, ce qui affaiblit la crédibilité du régime d'exportation et alimente les débats sur son durcissement.

### Un standard d'isolation mémoire chinois intégré pour la première fois à l'ISA RISC-V

**17 septembre 2026** — source : [科技日报](https://www.stdaily.com/web/gdxw/2026-09/17/content_582614.html) — impact **à suivre** · confiance : confirmé

Le standard d'extension SPMP (Protected Physical Memory), porté par l'équipe IPADS de l'université Jiao Tong de Shanghai, a été approuvé par le conseil de la RISC-V International Foundation et intégré à la spécification de l'architecture. C'est la première extension d'ISA initiée et pilotée de bout en bout par une équipe chinoise depuis la création de la fondation. Elle est déjà implémentée sur le processeur open source XiangShan et des cœurs RISC-V de Nuclei.

**Enjeu.** La maîtrise des standards d'ISA est un levier de long terme sur l'écosystème des puces, au-delà des seuls nœuds de fabrication. Une contribution chinoise structurante dans RISC-V renforce la crédibilité d'une troisième voie face à x86 et Arm, en particulier pour l'embarqué et l'automobile.

## Trois tendances de fond

**1. La mémoire est devenue le goulot dominant de l'IA, avant la logique.** Micron annonce une offre « nettement plus tendue » en 2027-2028 avec plus de 75 % de sa production 2027 déjà engagée ; YMTC évoque « au moins trois ans » de pénurie ; TrendForce voit les prix contractuels DRAM et NAND du quatrième trimestre repartir à la hausse. Conséquence directe : des coûts de serveurs, de PC et de smartphones durablement plus élevés, et un risque macroéconomique sur le cycle d'investissement.

**2. La frontière des nœuds se déplace de 2026 vers 2028-2030, avec TSMC seul en tête à court terme.** Le N2 monte à 120 000 plaquettes/mois fin 2026 et l'A14 est déjà en pilote pour un volume en 2028, tandis que l'18A d'Intel reste proche du N3E en densité et que son 14A n'est attendu qu'en production à risque au second semestre 2027. Cette asymétrie concentre la production mondiale de logique de pointe sur Taïwan.

**3. Les contrôles à l'exportation perdent en efficacité face à la stratégie d'autonomie chinoise.** Une DUV nationale est testée chez SMIC, des capitaux d'État auraient financé plus de 700 serveurs potentiellement équipés de puces interdites, et les constructeurs locaux montent en puissance sur les nœuds matures et la mémoire. Un rapport du Technology & Statecraft Center va jusqu'à recommander l'arrêt des exportations de DUVi, jugeant que l'avance américaine « pourrait se réduire, voire disparaître, dans 5 à 10 ans ».

## Ce que cette veille n'a pas pu établir

- **AMD Instinct MI450 et plateforme Helios** : aucune source exploitable n'a pu être ouverte (accès refusé côté éditeur, dépêches financières inaccessibles). Le lancement des racks Helios, des GPU MI450 et les volumes évoqués avec OpenAI et Meta ne sont donc ni confirmés ni datés ici.
- **Statut exact de la production de masse de l'A16** : la source est une synthèse d'investisseur s'appuyant sur des médias taïwanais, sans communiqué TSMC accessible. Les chiffres de capacité N2 et le revenu d'août proviennent de la presse taïwanaise et coréenne, pas d'un document officiel consulté.
- **Rendement de l'18A à 80 %** : annoncé d'après un analyste, non confirmé publiquement par Intel.
- **Comparaison 18A / N2** : les lectures se contredisent selon les commentaires ; la source primaire (SemiAnalysis) n'a pas été lue intégralement.
- **Horizons de pénurie mémoire contradictoires** : TrendForce (assouplissement du NAND au second semestre 2027), Micron (tension en 2027-2028), YMTC (« trois ans de plus »). La déclaration de YMTC repose sur un seul employé anonyme.
- **ASML** : les résultats du troisième trimestre 2026 sont annoncés pour le 14 octobre, donc postérieurs à cette édition ; aucune donnée trimestrielle n'était disponible.

## Méthode

Cette édition provient d'une collecte menée le 7 octobre 2026 sur la période du 8 septembre au 7 octobre, à partir de sources primaires (communiqués TSMC, ASML, Samsung, NVIDIA, résultats Micron) et de presse spécialisée (TechPowerUp, TrendForce, UDN, Yonhap, EDaily, Reuters relayé, 科技日报). Chaque fait porte son niveau de confiance : **confirmé** pour une source primaire, **rapporté** pour de la presse ou un analyste, **rumeur** pour un élément non confirmé par une partie prenante. Les faits que la collecte n'a pas permis d'établir sont publiés ci-dessus, plutôt qu'omis.

*Les deux autres volets de cette édition : [veille IA](/blog/veille-ia-2026-10-07/) et [veille technologies disruptives](/blog/veille-technologies-disruptives-2026-10-07/).*
