---
title: "Fusion nucléaire : trois voies, trois cadences"
description: "Ce qui a réellement été mesuré dans la fusion en septembre 2026 : un taux de réactions revendiqué en hydrogène-bore, deux jalons de construction, et une physique qui sépare les filières bien plus que les calendriers."
date: 2026-10-07
category: Technologies disruptives
tags: [fusion, énergie, nucléaire, iter, smr]
cover: /covers/fusion.svg
---

Une réaction de fusion ne se constate pas à l'œil : elle se compte. Le 28 septembre, le groupe chinois ENN a revendiqué plus de 10⁸ réactions par seconde sur son dispositif Xuanlong-50U, en hydrogène-bore — une filière qui, dans sa voie principale, ne produit pas de neutrons. Le même mois, ITER livrait un composant de sa chambre à vide et le complexe BEST entrait en service. Trois étapes de nature très différente, souvent présentées ensemble : l'une est une mesure, les deux autres sont des jalons de construction.

## L'essentiel

- **ENN revendique plus de 10⁸ réactions par seconde** en hydrogène-bore, par injection de faisceaux neutres couplée à des ondes radiofréquence. La performance est **auto-déclarée** et repose sur une seule source.[^3]
- La voie **hydrogène-bore ne produit pas de neutrons** dans sa réaction principale : elle donne trois noyaux d'hélium, pour 8,7 MeV libérés.[^8]
- Elle exige en revanche une **température d'allumage d'environ 123 keV**, soit près de dix fois celle du deutérium-tritium (13,6 keV).[^8]
- Dans le deutérium-tritium, **80 % de l'énergie part avec les neutrons**, qui activent la paroi ; ITER teste une couverture au lithium pour régénérer le tritium consommé.[^6][^7]
- Le **bilan énergétique** se mesure par le facteur Q : Q = 1 signifie que la fusion rend autant que le chauffage injecté — pas qu'elle produit de l'électricité.[^6]
- Kairos, lui, ne fusionne rien : c'est un petit réacteur à **fission** de 50 mégawatts, pour lequel Samsung engage jusqu'à 100 millions de dollars.[^4][^5]

## Ce qui a été mesuré, et comment

Un dispositif de fusion ne délivre pas directement un courant : il produit des **réactions**, et chacune libère des particules d'énergie connue. Le taux annoncé — des réactions par seconde — n'est jamais lu sur un cadran. Il est **déduit** du flux de ces particules détectées autour de la chambre, corrigé de l'angle solide du détecteur, de son rendement et du bruit de fond. C'est une inférence, avec une incertitude, et c'est pourquoi le détail du protocole compte autant que le chiffre.

Les **diagnostics** sont l'ensemble des instruments qui observent le plasma et ses produits.[^6] Ils mesurent deux familles de grandeurs : d'une part la température et la densité du plasma, par diffusion de lasers, émission ou interférométrie ; d'autre part les produits de réaction, par leur **spectre d'énergie**.

> **En clair**
> Un **spectre** est un histogramme : pour chaque énergie, le nombre de particules détectées. Il sert de pièce d'identité. Une réaction deutérium-tritium émet un noyau d'hélium et un neutron, dont les énergies sont fixées par la physique nucléaire ; une réaction hydrogène-bore émet trois noyaux d'hélium, pour 8,7 MeV au total. Si les particules observées n'ont pas ces énergies, ce n'est pas la réaction annoncée.

C'est ce que signifie « valider les spectres de protons et de particules alpha » dans l'annonce d'ENN : un panel d'une dizaine d'experts internationaux est présenté comme ayant contrôlé que les particules détectées avaient bien l'énergie attendue.[^3] Reste ce que la source consultée ne dit pas : le type de détecteurs, leur calibration, la soustraction du bruit de fond, et la composition exacte du panel. Sans ces éléments, le chiffre est **invérifiable de l'extérieur** — ce qui ne veut pas dire faux, mais veut dire non répliqué.

## Ce que veut dire « bilan énergétique »

Un chiffre de réactions par seconde ne dit rien de l'énergie. Pour cela, il existe un rapport simple, le facteur **Q** : la puissance produite par les réactions divisée par la puissance injectée pour chauffer le plasma.

> **En clair**
> **Q = 1** est le seuil d'« équilibre » : la fusion rend autant d'énergie que le chauffage en apporte. Ce n'est pas encore de l'électricité. Il faut ensuite convertir la chaleur avec le rendement d'une machine thermique, et soustraire l'énergie des aimants, des pompes et des faisceaux. Un réacteur commercial viserait donc un Q très supérieur à 1.

Le repère officiel est disponible : ITER vise **Q = 10**, et à ce niveau environ 66 % du chauffage du plasma proviendrait des particules alpha issues de la réaction elles-mêmes — le plasma entre alors dans le régime que les physiciens appellent « en combustion ».[^6] C'est un objectif de conception, pas un résultat.

## Pourquoi l'hydrogène-bore change le problème des matériaux

Dans le deutérium-tritium, le noyau d'hélium — la particule alpha — emporte **20 % de l'énergie** et reste confiné par les champs magnétiques ; le neutron emporte le reste, soit environ **80 %**, et traverse la paroi.[^6][^8] Trois conséquences en découlent, toutes matérielles :

- la paroi est **activée** par les neutrons, ce qui impose un bouclier et des matériaux choisis pour leur tenue ;
- le tritium, consommé par la réaction, doit être **régénéré** dans une couverture contenant du lithium, où les neutrons le produisent ;
- l'énergie doit être récupérée sous forme de chaleur dans cette même couverture.[^6][^7]

ITER documente l'ordre de grandeur : l'activation des composants doit rester assez faible pour que les matériaux soient recyclés ou réutilisés **en moins de cent ans**, ce qui dépend de ceux qui font face au plasma.[^7]

L'hydrogène-bore supprime les trois problèmes d'un coup : trois noyaux d'hélium, pas de neutron dans la voie principale, donc pas d'activation, pas de tritium et pas de couverture tritigène.[^8] En échange, la réaction est bien plus difficile à obtenir : la barrière coulombienne croît avec le nombre de protons des noyaux — le bore en porte cinq — et la température d'allumage passe de 13,6 keV à environ 123 keV, avec une section efficace plus faible.[^8]

> **En clair**
> Une réaction est dite **aneutronique** quand les neutrons emportent très peu de l'énergie — au plus 1 % selon une définition courante.[^8] « Peu » n'est pas « aucun » : des réactions secondaires peuvent produire des neutrons, et c'est pourquoi le mot exact est « aneutronique », pas « sans neutrons ».

## Les trois programmes, ramenés à ce qu'ils mesurent

| Programme | Combustible | Ce qui a été obtenu | Statut de la preuve |
| --- | --- | --- | --- |
| ITER | deutérium-tritium | dernier secteur de chambre à vide livré | jalon de construction, aucun résultat plasma |
| BEST (Hefei) | deutérium-tritium | complexe en service, assemblage à plus de 50 % | jalon de construction, pas de réaction |
| ENN (Xuanlong-50U) | hydrogène-bore | plus de 10⁸ réactions/s revendiquées | auto-déclaré, source unique |
| Kairos | fission (réacteur modulaire) | réacteur de 50 MW financé | hors du champ de la fusion |

<figure>
	<img src="/figures/fusion-voies.svg" alt="Comparaison des deux réactions : deutérium-tritium donnant un noyau d'hélium et un neutron, avec 80 % de l'énergie emportée par le neutron et une température d'allumage de 13,6 keV ; hydrogène-bore donnant trois noyaux d'hélium, 8,7 MeV, aucun neutron et une température d'allumage d'environ 123 keV" />
	<figcaption>Le choix du combustible décide de tout le reste : les produits de la réaction déterminent l'activation de la paroi, la nécessité d'une couverture tritigène, et la difficulté du chauffage. Les températures sont des seuils d'allumage, pas des températures atteintes par les machines citées.</figcaption>
</figure>

Lu ainsi, le tableau ne compare pas des calendriers mais des **maturités de preuve**. ITER a livré une pièce et BEST a mis un bâtiment en service : ce sont des jalons de construction, qui ne disent rien de la physique du plasma. ENN a franchi un cran différent — une mesure de réactions — mais une mesure non publiée. Quant à Kairos, il figure dans le paysage parce qu'il partage les clients et l'échéance des autres : les centres de données et 2030. Les 100 millions de dollars de Samsung achètent une machine à fission de 50 mégawatts — un petit réacteur modulaire, conçu pour être fabriqué en série plutôt que monté pièce par pièce sur site —, pas une avancée en fusion.[^4][^5]

Les échéances de 2030 sont d'ailleurs des objectifs annoncés, pas des engagements contractuels. Et aucun calendrier de production d'électricité n'est associé à ITER dans les sources consultées.

## Ce que l'on ne sait pas

- **La performance d'ENN est auto-déclarée** et n'a fait l'objet d'aucune réplication indépendante ; la composition du panel présenté comme validant la mesure n'est pas détaillée.
- **Le protocole de mesure d'ENN n'est pas publié** dans la source consultée : ni les détecteurs, ni leur calibration, ni la méthode de soustraction du bruit de fond.
- **L'annonce d'ENN ne repose que sur une seule source**, un quotidien institutionnel chinois, sans confirmation indépendante.
- **La température de 123 keV est un seuil d'allumage théorique**, pas une performance mesurée : aucune des machines citées n'est décrite comme l'ayant atteint.
- **La définition « aneutronique » varie** selon les auteurs, et la part réelle de neutrons dépend des réactions secondaires dans un dispositif donné.
- **La date de l'annonce Kairos est contradictoire** : 21 septembre selon TechCrunch, 2 septembre selon NucNet. La divergence est signalée, pas arbitrée.
- **Le combustible du réacteur de Kairos n'est pas précisé** dans les sources consultées, pas plus que son calendrier d'autorisation.
- **Les horizons 2030 sont des objectifs annoncés** : ni le coût de BEST, ni son financement ne figurent dans les sources consultées.

[^1]: ITER Organization, « Remarkable chapter draws to a close » — https://www.iter.org/node/20687/remarkable-chapter-draws-close

[^2]: CGTN, « China's artificial sun project enters key construction phase » — https://news.cgtn.com/news/2026-10-01/China-s-artificial-sun-project-enters-key-construction-phase-1QSYBsXj0d2/p.html

[^3]: Science and Technology Daily (quotidien du ministère chinois des Sciences et Technologies), réaction de fusion hydrogène-bore sur Xuanlong-50U — https://www.stdaily.com/web/gdxw/2026-09/28/content_589050.html

[^4]: TechCrunch, « Kairos Power gets up to $100M from Samsung Group to build nuclear reactor for Google » — https://techcrunch.com/2026/09/21/kairos-power-gets-up-to-100m-from-samsung-group-to-build-nuclear-reactor-for-google/

[^5]: NucNet, « South Korea's Samsung C&T to help build Kairos nuclear reactor for Google » — https://www.nucnet.org/news/south-korea-s-samsung-c-and-t-to-help-build-kairos-nuclear-reactor-for-google-9-2-2026

[^6]: ITER Organization, « Fusion glossary » — https://www.iter.org/fusion-glossary

[^7]: ITER Organization, « Advantages of fusion » — https://www.iter.org/fusion-energy/advantages-fusion

[^8]: Repères de physique des plasmas (réactions, seuils d'allumage, définition « aneutronique »), *Aneutronic fusion* — https://en.wikipedia.org/wiki/Aneutronic_fusion
