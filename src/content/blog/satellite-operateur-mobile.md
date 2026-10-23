---
title: "Téléphone par satellite : le budget de liaison avant la couverture"
description: "Un smartphone qui parle directement à un satellite, c'est d'abord 153 dB d'affaiblissement à franchir et un satellite visible 12 % du temps. Ce que la physique impose, et ce que le débit annoncé ne dit pas."
date: 2026-10-07
category: Connectivité
tags: [satellite, starlink, connectivité, télécoms]
cover: /covers/satellite-direct.svg
---

Faire communiquer un téléphone ordinaire avec un satellite n'est pas d'abord un problème de couverture, c'est un problème de **budget de liaison** : la puissance reçue après 550 km de trajet, avec l'antenne d'un smartphone à un bout et celle d'un satellite à l'autre. Les annonces de 2026 — autorisation américaine, débits promis, retards de constellation — se lisent toutes à la lumière de ce calcul.

## L'essentiel

- À 2 GHz, l'affaiblissement en espace libre vaut environ **153 dB** sur 550 km, contre **98 dB** sur 1 km pour une antenne terrestre : un écart d'environ **55 dB**, soit un facteur 300 000 en puissance.[^3]
- Ce que compense le satellite, c'est son **antenne** : le gain croît comme la surface, et doubler la surface ajoute 3 dB.
- À 550 km, un satellite boucle son orbite en **95 minutes** et n'est au-dessus d'un point donné que **12 % du temps**, soit une dizaine de minutes par passage.[^3]
- D'où la flotte : la couverture continue n'est pas un choix commercial, c'est une conséquence de la géométrie.
- Les **150 Mbps** annoncés sont un objectif pour une génération non déployée, et la source ne précise pas s'ils valent par utilisateur, par faisceau ou pour l'ensemble du satellite.[^1]

## Ce qui est mesuré, ce qui est annoncé

Aucune mesure indépendante du service direct n'est publiée. Ce qui existe, ce sont trois choses de nature différente, qu'il faut séparer :

- un **fait réglementaire** : la FCC a autorisé SpaceX à exploiter Starlink Mobile hors des États-Unis ;[^1]
- un **état de flotte** rapporté par la presse spécialisée : les satellites 11 à 13 fonctionnent nominalement, les 14 à 16 sont en route, et l'objectif de 45 satellites glisse à début 2027 ;[^2]
- des **objectifs annoncés** : des débits jusqu'à 150 Mbps, par une génération de satellites qui n'est pas encore en service.[^1]

Le calcul qui suit n'est donc pas une mesure du service : c'est un budget de liaison, c'est-à-dire ce que la physique impose indépendamment de tout communiqué. Les valeurs sont calculées à partir de formules standard, et reproductibles.

## Le budget de liaison

La puissance reçue par une antenne décroît comme le carré de la distance. On l'exprime par l'**affaiblissement en espace libre**, qui ne dépend que de la distance et de la fréquence :

> **En clair**
> Affaiblissement (dB) = 20 log₁₀(d) + 20 log₁₀(f) − 147,55, avec d en mètres et f en hertz. Chaque doublement de distance ajoute 6 dB, soit un facteur 4 en puissance — c'est une loi en carré, pas une marge d'ingénierie.

| Grandeur | Antenne terrestre, 1 km | Satellite en orbite basse, 550 km |
| --- | --- | --- |
| Fréquence | 2 GHz | 2 GHz |
| Affaiblissement en espace libre | ≈ 98 dB | ≈ 153 dB |
| Écart | — | ≈ +55 dB (facteur ≈ 300 000) |
| Délai de propagation | ≈ 3 µs | ≈ 1,8 ms (aller simple) |

Ces valeurs sont calculées, pas mesurées. Elles disent l'ordre de grandeur : le satellite part avec un handicap de 55 dB, qu'il doit récupérer ailleurs dans le bilan.

Deux leviers existent, et un seul est réellement disponible. Le premier serait d'augmenter la puissance d'émission du téléphone : elle est plafonnée par la réglementation et par la batterie, de l'ordre de 0,2 W, et ne bougera pas. Le second est le **gain d'antenne**, à bord : pour une antenne de surface A, le gain vaut environ 4πA/λ². À 2 GHz, où la longueur d'onde vaut 15 cm, une antenne d'un mètre carré apporte déjà près de 28 dBi, et doubler sa surface ajoute 3 dB.

C'est ce qui explique la forme des satellites concernés : de grandes antennes déployables, parce que la surface est le seul terme du bilan qu'on puisse encore faire croître.

<figure>
	<img src="/figures/satellite-direct.svg" alt="À gauche une antenne relais couvrant une petite zone, à droite un satellite couvrant une région entière" />
	<figcaption>Le réseau terrestre grandit site par site ; le réseau satellitaire, lancement par lancement. Le second couvre plus large, mais chaque satellite doit compenser un affaiblissement de 55 dB par la taille de son antenne.</figcaption>
</figure>

## Pourquoi l'orbite basse impose une flotte

Un satellite géostationnaire paraît au-dessus du même point en permanence, mais il est à 36 000 km : l'affaiblissement y serait d'environ 36 dB plus élevé encore, et le délai de propagation de 120 ms pour un aller simple. L'orbite basse est donc choisie pour le budget de liaison et la latence — au prix de la mobilité.

À 550 km d'altitude, la troisième loi de Kepler donne une période d'environ **95 minutes**. Reste à savoir quelle fraction de cette orbite le satellite est visible depuis un point donné. L'angle au centre de la Terre sous lequel il voit la Terre vaut arccos(R/(R+h)), avec R le rayon terrestre et h l'altitude : environ **23°**. Un satellite n'est donc au-dessus de l'horizon d'un point fixe que pendant 46° de son orbite, soit **12,8 %** de la période — une douzaine de minutes.

> **En clair**
> La **couverture continue** n'est pas la couverture tout court. Un satellite qui passe au-dessus d'un pays toutes les 95 minutes offre une connexion par intermittence ; il en faut assez pour qu'un autre prenne le relais avant que le premier disparaisse à l'horizon.

C'est de là que vient le nombre. Une flotte n'est pas une surenchère commerciale : c'est la conséquence arithmétique d'un satellite qui n'est visible qu'un huitième du temps. Et chaque satellite supplémentaire ne se contente pas d'ajouter de la capacité — il comble un trou de géométrie.

## Ce que « 150 Mbps » ne dit pas

Le chiffre est un objectif, et il est incomplet de trois façons.

**Il ne dit pas la base.** Un débit peut être annoncé par utilisateur, par faisceau, ou pour l'ensemble d'un satellite. Un satellite à faisceaux multiples sert des centaines d'utilisateurs simultanément ; le débit partagé n'est pas le débit individuel.

**Il ne dit pas l'efficacité spectrale.** La capacité dépend de la bande allouée, de la modulation et du rapport signal/bruit au récepteur — c'est-à-dire, in fine, du budget de liaison calculé plus haut.

**Il ne dit pas la latence.** La propagation aller simple à 550 km vaut environ 1,8 ms, mais le délai de bout en bout dépend aussi du traitement à bord, du trajet vers la passerelle au sol et du routage. Un chiffre de débit ne dit rien du temps de réponse.

> **En clair**
> Une **station de base orbitale**, c'est un satellite qui se comporte comme une antenne relais : le téléphone n'a pas besoin de matériel supplémentaire, il utilise sa puce radio habituelle. Toute la difficulté est de faire tenir une antenne de plusieurs mètres carrés dans un lanceur, puis de la déployer.

## La conséquence industrielle

Une fois le problème posé ainsi, l'actualité se relit sans mystère. Deux stratégies s'opposent : d'un côté des satellites plus petits, produits et lancés en série, dont la couverture vient du nombre ; de l'autre des satellites plus grands, aux antennes déployables de grande surface — donc plus performants par satellite, mais plus longs à fabriquer. Les trois derniers satellites lancés fonctionnent nominalement, et les trois suivants ont quitté l'usine de Midland, au Texas, pour Cap Canaveral.[^2] Le problème n'est pas la panne, c'est le rythme.

## Ce que l'on ne sait pas

- **Aucune mesure indépendante du service n'est publiée** : les débits annoncés ne sont pas des mesures, et la génération de satellites concernée n'est pas déployée.[^1]
- **La base du chiffre de 150 Mbps n'est pas précisée** — par utilisateur, par faisceau ou par satellite — ce qui interdit toute comparaison avec un réseau terrestre.
- **Le gain réel des antennes embarquées n'est pas public**, alors que c'est le terme qui décide du bilan de liaison.
- **La date exacte de la décision de la FCC n'a pas pu être établie** : le document existe et l'autorisation est corroborée par plusieurs médias, mais la date de publication de l'ordonnance n'est pas confirmée.
- **Le retard d'AST SpaceMobile provient d'une source de presse spécialisée unique**[^2], qui s'appuie sur des estimations d'analystes. Aucune confirmation par l'entreprise n'a été consultée.
- **Les performances dépendent du nombre d'abonnés simultanés par faisceau**, un chiffre que ni SpaceX ni AST ne publient.
- **Le cadre réglementaire européen** applicable à ces services n'a pas été examiné : l'autorisation américaine ne vaut pas autorisation en Europe.
- **Les valeurs de ce budget de liaison sont calculées** à partir de formules standard, avec une altitude nominale de 550 km et une fréquence de 2 GHz ; elles donnent un ordre de grandeur, pas le bilan d'un système réel.

[^1]: Radio Moldova, « Starlink Mobile expands globally following key US license » — https://radiomoldova.md/p/85496/starlink-mobile-expands-globally-following-key-us-license — document FCC associé : https://docs.fcc.gov/public/attachments/DOC-417881A1.pdf

[^2]: Advanced Television, « BlueBirds 11-13 OK, 14-16 en route » — https://www.advanced-television.com/2026/10/03/bluebirds-111213-ok-141516-en-route/

[^3]: Calculs de l'auteur : affaiblissement en espace libre, période orbitale képlérienne et angle de visibilité, à 2 GHz et 550 km d'altitude.
