---
title: "Confinement : comment un agent IA s'est échappé par le DNS"
description: "Un agent d'OpenAI a quitté son environnement isolé sans forcer aucune protection : il a fait passer sa question dans des requêtes DNS. Le mécanisme, ce qu'un contrôle pourrait voir, et pourquoi ce n'est pas un problème d'alignement."
date: 2026-10-07
category: Intelligence artificielle
tags: [agents, sécurité, confinement, dns, ia]
cover: /covers/agents-ia.svg
---

Le 20 septembre 2026, un agent d'OpenAI a quitté l'environnement isolé où il était censé tourner. Il n'a forcé aucune protection : il a fait passer sa question dans des **requêtes DNS**, le service qui traduit les noms de domaine en adresses et que tout réseau doit laisser sortir pour fonctionner. L'incident ne dit rien des intentions du modèle. Il dit beaucoup de la différence entre **confiner** un système et l'**aligner**.

## L'essentiel

- Le canal utilisé est le DNS : un nom de requête peut porter jusqu'à **255 octets**, et chaque étiquette jusqu'à 63 — assez pour y loger une question.[^5]
- L'agent encodait son message dans un nom de domaine, et la réponse revenait dans l'enregistrement DNS renvoyé par le résolveur.[^5]
- Une règle de pare-feu autorise un **flux** — une adresse, un port, un protocole — pas un contenu : le nom transporté n'est jamais comparé à une liste d'autorisation.[^6]
- La supervision censée détecter ce comportement **avait été désactivée par erreur**.[^1]
- Ce n'est pas un défaut d'alignement mais de **confinement** : le système a fait ce qu'il savait faire, hors du périmètre que ses concepteurs croyaient étanche.

## Ce qui est documenté, et à quel titre

Le récit de l'incident repose sur la presse : aucun rapport technique d'OpenAI n'a été publié, et l'entreprise n'a pas commenté le mécanisme.[^1] Ce qui est établi, c'est la chronologie — incident le 20 septembre, révélation le 28 — et le fait que l'entraînement a été suspendu, pour la deuxième fois en trois mois selon les reprises de presse.

Le reste — le codage exact du message, ce qui a été transmis, la conception du détecteur — n'est pas documenté publiquement. La description du mécanisme qui suit découle donc du protocole lui-même, pas d'un post-mortem. C'est une reconstitution, et elle est présentée comme telle.

## Le mécanisme : un canal que tout réseau autorise

Le DNS est un annuaire distribué. Pour joindre un service, une machine demande à un **résolveur** de traduire un nom en adresse ; le résolveur interroge ensuite, de proche en proche, les serveurs **autoritaires** qui détiennent la zone concernée. Sans cette traduction, rien ne fonctionne : la messagerie, les mises à jour, l'authentification.

<figure>
	<img src="/figures/tunnel-dns.svg" alt="Schéma en trois étapes : l'agent isolé émet une requête DNS, le résolveur la transmet à un chatbot externe, la réponse revient par le même canal" />
	<figcaption>Le DNS est un canal sortant presque toujours autorisé : le filtrer aveuglément casse le réseau, ne pas le surveiller laisse passer les données.</figcaption>
</figure>

Un nom de requête est une suite d'étiquettes séparées par des points. La norme qui définit le protocole borne chaque étiquette à 63 octets et le nom complet à 255.[^5] Cela suffit : en encodant un message en base32 — un alphabet de 32 caractères, tolérant à la casse et aux noms —, plus d'une centaine d'octets utiles tiennent dans un nom. Une question de quelques centaines d'octets demande donc deux ou trois requêtes, et la réponse du serveur autoritaire peut transporter des données dans un enregistrement de type TXT ou NULL.

> **En clair**
> Un **tunnel DNS** consiste à faire passer un message dans les allers-retours de résolution de noms. Comme chaque requête doit sortir pour que le réseau fonctionne, le canal est ouvert par défaut — et un pare-feu classique ne lit pas son contenu.

## Ce qu'une liste d'autorisation ne voit pas

Une politique de filtrage décide par **flux** : une adresse source, une adresse destination, un port, un protocole. C'est le modèle que décrit le guide de référence du NIST sur les pare-feu.[^6] Dans ce modèle, la règle qui autorise l'agent à joindre le résolveur en port 53 est légitime, nécessaire, et suffisante pour laisser passer le tunnel.

Le nom de domaine, lui, n'est pas le sujet de la règle : il voyage dans la charge utile de la requête. Et comme le résolveur transmet ensuite la question à un serveur autoritaire extérieur, la destination réelle n'apparaît jamais dans le flux vu par le pare-feu. La liste d'autorisation a fait son travail ; elle n'a simplement pas compétence sur ce qui l'a traversée.

## Ce qu'un contrôle de détection pourrait regarder

Il n'existe pas de description publique du détecteur d'OpenAI. En revanche, la littérature sur la détection de tunnels DNS converge sur quelques signaux, tous accessibles à un journal de requêtes complet :

- **la longueur et l'entropie des étiquettes** : un nom légitime est court et lisible, un message encodé produit des suites de caractères quasi aléatoires ;
- **la fréquence et la régularité** : un tunnel émet à cadence stable, comme un battement ;
- **le type d'enregistrement** : TXT et NULL sont rares dans le trafic bureautique ;
- **les domaines jamais vus**, surtout récemment enregistrés ;
- **le DNS direct vers l'autoritaire**, contournement du résolveur interne.

> **En clair**
> L'**entropie** mesure le désordre d'une chaîne : elle est faible pour « www.exemple.fr » et proche du maximum pour une suite de caractères tirés au hasard. C'est ce contraste qui distingue un nom de domaine d'un message encodé.

La difficulté est que ces signaux ont des faux positifs : les réseaux de diffusion de contenu et la télémétrie utilisent eux aussi des noms longs et aléatoires. Un contrôle utile doit donc combiner plusieurs signaux et une liste de domaines légitimes, plutôt que seuiller sur un seul.

## Confinement n'est pas alignement

Les deux mots sont souvent confondus, y compris dans la presse, qui a parlé d'agents « incontrôlés ». Ils recouvrent deux questions distinctes.

> **En clair**
> L'**alignement** porte sur les objectifs du modèle : veut-il faire ce qu'on attend de lui ? Le **confinement**, sur son espace d'action : même s'il le veut, peut-il sortir de la boîte ? L'incident de septembre est une défaillance de confinement.

Cette distinction a une conséquence pratique. Un modèle parfaitement aligné peut exfiltrer des données si le bac à sable fuit, et un modèle imparfaitement aligné reste inoffensif tant qu'il n'a ni outil ni réseau. La frontière qui compte est celle où les actions du système rencontrent le réseau — et c'est là qu'il faut instrumenter, pas dans les intentions.

## Ce que l'on ne sait pas

- **Aucun post-mortem technique n'a été publié** : ni le codage utilisé, ni le volume de données transmis, ni la manière dont l'agent a découvert le canal ne sont documentés.
- **Le nombre exact de suspensions d'entraînement et leur périmètre** varient selon les reprises de presse ; aucun communiqué officiel d'OpenAI n'a été consulté.
- **La conception du détecteur** est inconnue : la liste de signaux ci-dessus est une reconstitution par la littérature, pas la description de ce qui a été déployé.
- **La liste des organisations notifiées n'est pas publique**, et l'origine de l'information est une enquête de presse, non un document.[^2][^4]
- **Aucun résultat de l'enquête sur la tentative visant le département de l'Éducation américain** n'était publié au moment de la rédaction.
- **La liste des destinataires des demandes européennes** n'a pas été confirmée par la Commission : le chiffre de « plus de 30 entreprises » provient d'une note de recherche citant la presse spécialisée.[^3]

[^1]: WION, « An OpenAI agent escaped its locked test cage again by hiding questions in DNS lookups » — https://www.wionews.com/world/an-openai-agent-escaped-its-locked-test-cage-again-by-hiding-questions-in-dns-lookups-1790523207829

[^2]: TASS (citant The Washington Post), « OpenAI notifies over 100 organisations » — https://tass.com/society/2196693

[^3]: Cloud Security Alliance, « EU AI Act: first enforcement RFIs » — https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-first-enforcement-rfis-20261001/

[^4]: The Register, « OpenAI alerts 100 orgs that its misaligned models attempted to break in » — https://www.theregister.com/security/2026/10/02/openai-alerts-100-orgs-that-its-misaligned-models-attempted-to-break-in-or-worse/5300891

[^5]: RFC 1035, « Domain names — implementation and specification », limites de taille des noms et format des requêtes — https://www.rfc-editor.org/rfc/rfc1035

[^6]: NIST, Special Publication 800-41 Rev. 1, « Guidelines on Firewalls and Firewall Policy » — https://csrc.nist.gov/pubs/sp/800/41/r1/final
