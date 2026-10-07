---
title: "AI Act : ce qui s'applique déjà, ce qui est reporté"
description: "Les obligations de transparence s'appliquent depuis le 2 août 2026 et le Bureau de l'IA a déjà interrogé plus de 30 fournisseurs de modèles. Le haut risque, lui, a été repoussé à décembre 2027."
date: 2026-10-07
category: Intelligence artificielle
tags: [ai-act, régulation, europe, conformité, ia]
cover: /covers/ai-act.svg
---

Pendant deux ans, l'AI Act a été présenté comme une échéance à venir. C'est désormais un régime en vigueur : depuis le 2 août 2026, les obligations de transparence s'appliquent, et le Bureau de l'IA — le régulateur européen créé par le règlement — a adressé ses premières demandes formelles à plus de trente fournisseurs de modèles.[^1] Le même été, un texte correctif a repoussé de quatorze mois les obligations les plus lourdes.[^2] Deux calendriers, désormais, qu'il faut tenir ensemble.

## L'essentiel

- **Depuis le 2 août 2026**, l'article 50 sur la transparence et les sanctions visant les modèles à usage général s'appliquent.[^2]
- Le **29 août 2026**, le Bureau de l'IA a envoyé des demandes d'information à **plus de 30 fournisseurs** de modèles d'usage général.[^1]
- Une réponse **incomplète ou trompeuse** est sanctionnable jusqu'à **15 M€ ou 3 % du chiffre d'affaires mondial**.[^1]
- Le règlement **2026/1744** reporte le haut risque au **2 décembre 2027** (annexe III) et au **2 août 2028** (annexe I).[^2]
- **OpenAI filigrane** les textes de ChatGPT et Codex dans l'UE, mais laisse la fonction **désactivée par défaut dans l'API**.[^3]
- **60 % des entreprises françaises** n'ont aucun cadre formel d'usage de l'IA ; **84 % des directions informatiques** interrogées ont annulé au moins un projet.[^4][^5]

## Un pouvoir d'enquête déjà exercé

Le règlement ne fixe pas seulement des obligations : il donne à la Commission de quoi les vérifier. Les demandes envoyées le 29 août relèvent de l'article 91 et portent sur trois points — sécurisation des modèles contre les attaques, évaluation par des tiers indépendants, surveillance après déploiement.[^1]

> **En clair**
> L'**article 91** est le pouvoir d'enquête du règlement : la Commission peut exiger d'un fournisseur qu'il documente ses pratiques, avant tout constat d'infraction. Ce n'est pas une sanction, mais une demande à laquelle il faut répondre.

Le chiffre de « plus de 30 entreprises » vient d'une note du Cloud Security Alliance, qui s'appuie sur la presse européenne.[^1] OpenAI, Google et Anthropic sont cités comme destinataires probables, sans confirmation de la Commission. La sanction est nette : jusqu'à 15 M€ ou 3 % du chiffre d'affaires mondial en cas de réponse incomplète ou trompeuse.[^1]

## Ce qui a été reporté, et jusqu'à quand

Le règlement (UE) 2026/1744 a été publié au Journal officiel le 24 juillet 2026 et est entré en vigueur le 27 juillet.[^2] Il décale les obligations applicables aux systèmes à haut risque de l'annexe III au 2 décembre 2027, et celles de l'annexe I au 2 août 2028. Deux autres échéances, le 2 décembre 2026 et le 2 août 2027, sont annoncées sans que leur contenu soit détaillé.[^2]

> **En clair**
> Un **système à haut risque** n'est pas un système « puissant » : c'est un usage jugé assez sensible pour exiger des obligations renforcées — documentation, évaluation, surveillance. Le règlement les répartit entre deux annexes, I et III, aux échéances différentes.

<figure>
	<img src="/figures/frise-ai-act.svg" alt="Frise de cinq jalons : 2 août 2026 applicable, 2 décembre 2026 et 2 août 2027 annoncés, 2 décembre 2027 et 2 août 2028 reportés et marqués haut risque" />
	<figcaption>Deux régimes dans un même texte : ce qui s'applique depuis le 2 août 2026, et ce qui a été repoussé de quatorze mois. Les deux échéances intermédiaires sont datées, mais leur contenu n'est pas documenté.</figcaption>
</figure>

| Échéance | Ce qui s'applique | Statut |
| --- | --- | --- |
| 2 août 2026 | Article 50 (transparence) et sanctions sur les modèles à usage général | **déjà applicable** |
| 2 décembre 2026 | échéance annoncée, contenu non détaillé | à venir |
| 2 août 2027 | échéance annoncée, contenu non détaillé | à venir |
| 2 décembre 2027 | Haut risque, annexe III | **reporté** |
| 2 août 2028 | Haut risque, annexe I | **reporté** |

Les entreprises gagnent donc quatorze mois sur les obligations les plus coûteuses, mais restent exposées dès maintenant sur la transparence et sur l'alphabétisation IA de l'article 4.

## Le filigrane : une conformité qui tient à un réglage

L'article 50 impose de signaler les contenus générés. OpenAI a publié le 5 octobre un rapport technique de vingt pages sur **textGrain**, le filigrane statistique appliqué au texte éligible de ChatGPT et Codex dans l'Union européenne.[^3]

> **En clair**
> Un **filigrane statistique** ne se voit pas : il biaise discrètement le choix des mots pour y laisser une empreinte détectable par un outil. Il ne survit pas à une réécriture — ce que montrent les chiffres publiés.

Ces chiffres donnent la mesure du procédé : environ 95 % de détection sur 400 tokens, 80 % sur 200, et seulement 17 % après remplacement d'un quart des mots par des synonymes ; dans les langues de l'Union, de 42,2 % (roumain) à 69,0 % (espagnol).[^3] Le détecteur est réservé aux chercheurs agréés.

Le point pratique est ailleurs : dans l'API — pour tout éditeur qui intègre le modèle dans son produit —, le filigrane reste **désactivé par défaut**.[^3] Un intégrateur qui ne touche à rien ne peut donc pas invoquer le marquage d'OpenAI : la conformité se joue sur un paramètre de configuration, pas sur un contrat.

## Les entreprises françaises n'ont pas encore de cadre

Deux enquêtes publiées à cinq jours d'intervalle dessinent le même écart entre l'intention et l'exécution. Côté mondial, une étude de GFT auprès de 945 directions informatiques d'entreprises de plus de 500 millions de dollars conclut que 84 % ont annulé au moins un projet d'IA à cause de leurs systèmes existants.[^4]

Côté français, le baromètre Coface et Les Échos Études, mené auprès de 900 décideurs, indique que 60 % des entreprises n'ont aucun cadre formel d'usage de l'IA, que 35 % n'en prévoient pas et que 17 % seulement ont défini une politique ; 41 % citent la sécurité des données et la conformité comme premier obstacle.[^5]

> **En clair**
> L'**alphabétisation IA** (article 4) oblige une organisation à s'assurer que son personnel comprend ce qu'un système d'IA fait et ne fait pas : elle se démontre par des mesures. Les **codes de pratique** sont les textes volontaires que la Commission négocie avec les fournisseurs pour préciser comment se conformer au règlement.

À cette asymétrie s'en ajoute une autre, entre États membres. L'Allemagne a désigné son autorité de surveillance, la Bundesnetzagentur, par une loi en vigueur depuis le 29 juillet 2026. En France, au 6 octobre, le projet de loi de mise en conformité (DDADUE) n'avait ni rapport ni texte adopté en commission à l'Assemblée.[^2] Une entreprise française sait donc à quelles règles elle est soumise, sans savoir à quelle autorité s'adresser.

## Pendant ce temps, les laboratoires s'organisent seuls

Le mouvement parallèle est américain. Google, OpenAI et Anthropic travailleraient à un organisme volontaire provisoirement nommé « Frontier AI Standards » : tests de sécurité avant déploiement par des tiers, déclaration d'incidents, qualification des auditeurs, sur le modèle de la FINRA, l'autorégulateur de la place financière américaine — donc sans gouvernement à la direction.[^6][^7] Les trois laboratoires auraient d'abord cherché un partenariat public-privé fédéral, avant de basculer vers l'autorégulation après l'enlisement d'un décret sur les normes de frontière.[^7]

Pendant ce temps, Washington change de vocabulaire : un décret du 29 septembre 2026 demande aux agences fédérales de remplacer « intelligence artificielle » par « super intelligence », et une « Super Intelligence Force » a été annoncée le 5 octobre pour coordonner l'action fédérale.[^8][^9]

## Ce que l'on ne sait pas

- **La liste des destinataires des demandes de l'article 91 n'est pas confirmée** par la Commission : le chiffre de « plus de 30 entreprises » repose sur une **source unique**, une note du Cloud Security Alliance citant la presse européenne.[^1]
- **Le calendrier réglementaire et le filigrane reposent, dans cette note, sur une source unique** — ActuIA —, qui s'appuie sur le texte du règlement et le rapport technique d'OpenAI, non consultés directement ici.[^2][^3]
- **Les taux de détection du filigrane sont annoncés par OpenAI**, sans réplication indépendante connue : ils tombent à 17 % après substitution d'un quart des mots par des synonymes.[^3]
- **« Frontier AI Standards »** reste un nom provisoire : périmètre et statut juridique non confirmés, et les sources divergent sur la date de l'information (15 ou 26 septembre).[^6][^7]
- **Le décret américain** n'a pas pu être lu dans son intégralité : la fiche de la Maison-Blanche était tronquée, et la portée juridique de la « Super Intelligence Force » repose sur la presse.[^8][^9]
- **Le contenu des échéances du 2 décembre 2026 et du 2 août 2027** n'est pas détaillé par les sources : la frise les signale comme des dates annoncées, pas comme des obligations identifiées.[^2]

[^1]: Cloud Security Alliance, « EU AI Act: first enforcement RFIs » — https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-first-enforcement-rfis-20261001/

[^2]: ActuIA, « AI Act : obligations in force and delays under omnibus 2026/1744 » — https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/

[^3]: ActuIA, « OpenAI will watermark ChatGPT in the EU, but leaves the API opt-in » — https://www.actuia.com/en/news/openai-will-watermark-chatgpt-in-the-eu-but-leaves-the-api-opt-in/

[^4]: GFT Technologies, « New AI research from GFT Technologies » — https://www.gft.com/us/en/about-us/newsroom/press-and-news/2026/press-releases/new-ai-research-from-gft-technologies

[^5]: ActuIA (baromètre Coface et Les Échos Études), « Six in ten French companies have no AI framework » — https://www.actuia.com/en/news/six-in-ten-french-companies-have-no-ai-framework-coface/

[^6]: WION, « Google, OpenAI and Anthropic are building their own AI regulator, with no government in it » — https://www.wionews.com/world/google-openai-and-anthropic-are-building-their-own-ai-regulator-with-no-government-in-it-1790428130541

[^7]: Ahram Online, « Frontier AI Standards » — https://english.ahram.org.eg/UI/Front/Inner.aspx?NewsContentID=576758

[^8]: Kazinform, « Trump announces Super Intelligence Force to coordinate US AI policy » — https://qazinform.com/news/trump-announces-super-intelligence-force-to-coordinate-us-ai-policy-906133

[^9]: Maison-Blanche, « President Donald J. Trump inaugurates the era of Super Intelligence » — https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/
