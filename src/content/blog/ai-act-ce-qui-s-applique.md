---
title: "AI Act : ce que le texte oblige, et depuis quand"
description: "Le règlement européen n'est plus une échéance : il est en vigueur. Ce que chaque obligation demande, à quelle date elle s'applique, et ce que le texte correctif de 2026 a déplacé."
date: 2026-10-07
category: Intelligence artificielle
tags: [ai-act, régulation, europe, conformité, ia]
cover: /covers/ai-act.svg
---

Pendant deux ans, l'AI Act a été présenté comme une échéance à venir. C'est désormais un régime en vigueur, avec des obligations datées, un pouvoir d'enquête déjà exercé et un texte correctif qui a déplacé les échéances les plus lourdes. Pour un sujet juridique, la question n'est pas de savoir ce que le marché anticipe, mais **ce que le texte dit, et à partir de quand**.

## L'essentiel

- **Depuis le 2 août 2026**, l'article 50 sur la transparence et les sanctions visant les modèles à usage général s'appliquent.[^2]
- L'**article 91** donne à la Commission un pouvoir d'enquête, exercé pour la première fois le 29 août 2026 auprès de **plus de 30 fournisseurs** de modèles.[^1]
- Une réponse **incomplète ou trompeuse** à ces demandes est sanctionnable jusqu'à **15 M€ ou 3 % du chiffre d'affaires mondial**.[^1]
- Le règlement **2026/1744** reporte le haut risque au **2 décembre 2027** (annexe III) et au **2 août 2028** (annexe I).[^2]
- La source qui fait foi est le **règlement (UE) 2024/1689**, tel que modifié ; elle n'a pas pu être téléchargée depuis ce poste, ce qui borne la portée de cette note.[^10]

## La source qui fait foi

Un article juridique a une exigence propre : là où l'on attend une mesure, on attend ici **le texte**. La chaîne normative est simple. Le règlement (UE) 2024/1689 a été adopté en 2024 ; il est publié au Journal officiel de l'Union et fait foi dans toutes les langues officielles. Un second règlement, le (UE) 2026/1744, l'a modifié en juillet 2026 sans le réécrire : il déplace des dates d'application.[^2]

La distinction entre **entrée en vigueur** et **application** est le point que l'on confond le plus souvent. Un règlement entre en vigueur à une date fixe, mais ses obligations s'appliquent selon un calendrier propre, article par article.

> **En clair**
> Une **date d'entrée en vigueur** est le moment où le texte devient du droit ; une **date d'application** est le moment où une obligation précise devient opposable. Un règlement peut être en vigueur depuis un an et n'imposer encore que deux de ses articles.

## Ce que le texte oblige, et depuis quand

| Obligation | Article | Date d'application | Statut | Source |
| --- | --- | --- | --- | --- |
| Transparence des contenus générés | art. 50 | 2 août 2026 | en application | [^2] |
| Sanctions sur les modèles à usage général | — | 2 août 2026 | en application | [^2] |
| Demandes d'information | art. 91 | 29 août 2026 (premier usage) | exercé | [^1] |
| Alphabétisation IA | art. 4 | non vérifiée ici | en vigueur | [^10] |
| Haut risque, annexe III | art. 6 | 2 décembre 2027 | reporté | [^2] |
| Haut risque, annexe I | art. 6 | 2 août 2028 | reporté | [^2] |
| Échéances intermédiaires | — | 2 décembre 2026, 2 août 2027 | contenu non détaillé | [^2] |

Deux lignes appellent une précaution : les échéances du 2 décembre 2026 et du 2 août 2027 sont **datées mais non documentées** — les sources ne disent pas quelle obligation elles portent ; et la date d'application de l'article 4 n'a pas pu être vérifiée, elle est laissée vide plutôt que devinée.

## Le pouvoir d'enquête, déjà exercé

Le règlement ne se contente pas de fixer des obligations : il donne à la Commission de quoi les vérifier. Les demandes du 29 août relèvent de l'article 91 et portent sur trois points — sécurisation des modèles contre les attaques, évaluation par des tiers indépendants, surveillance après déploiement.[^1]

> **En clair**
> L'**article 91** est le pouvoir d'enquête du règlement : la Commission peut exiger d'un fournisseur qu'il documente ses pratiques, avant tout constat d'infraction. Ce n'est pas une sanction, mais une demande à laquelle il faut répondre.

Le chiffre de « plus de 30 entreprises » vient d'une note du Cloud Security Alliance, qui s'appuie sur la presse européenne.[^1] OpenAI, Google et Anthropic sont cités comme destinataires probables, sans confirmation de la Commission. La sanction encourue est nette : jusqu'à 15 M€ ou 3 % du chiffre d'affaires mondial en cas de réponse incomplète ou trompeuse.

## Ce que le report a déplacé

Le règlement (UE) 2026/1744 a été publié au Journal officiel le 24 juillet 2026 et est entré en vigueur le 27 juillet.[^2] Il décale les obligations applicables aux systèmes à haut risque de l'annexe III au 2 décembre 2027, et celles de l'annexe I au 2 août 2028.

> **En clair**
> Un **système à haut risque** n'est pas un système « puissant » : c'est un usage jugé assez sensible pour exiger des obligations renforcées — documentation, évaluation, surveillance. Le règlement les répartit entre deux annexes, I et III, aux échéances différentes.

<figure>
	<img src="/figures/frise-ai-act.svg" alt="Frise de cinq jalons : 2 août 2026 applicable, 2 décembre 2026 et 2 août 2027 annoncés, 2 décembre 2027 et 2 août 2028 reportés et marqués haut risque" />
	<figcaption>Deux régimes dans un même texte : ce qui s'applique depuis le 2 août 2026, et ce qui a été repoussé de quatorze mois. Les deux échéances intermédiaires sont datées, mais leur contenu n'est pas documenté.</figcaption>
</figure>

Le report ne vide pas le règlement : il déplace la charge la plus lourde — la conformité des systèmes à haut risque — sans toucher à la transparence, déjà applicable.

## La transparence, et sa mesure

L'article 50 impose de signaler les contenus générés. C'est la seule obligation du texte dont l'effet soit aujourd'hui **mesuré**, et c'est donc là que la méthode compte.

OpenAI a publié le 5 octobre un rapport technique de vingt pages sur **textGrain**, le filigrane statistique appliqué au texte éligible de ChatGPT et Codex dans l'Union européenne.[^3] Les chiffres annoncés donnent la mesure du procédé : environ 95 % de détection sur 400 tokens, 80 % sur 200, et seulement 17 % après remplacement d'un quart des mots par des synonymes ; dans les langues de l'Union, de 42,2 % (roumain) à 69,0 % (espagnol). Le détecteur est réservé aux chercheurs agréés.

> **En clair**
> Un **filigrane statistique** ne se voit pas : il biaise discrètement le choix des mots pour y laisser une empreinte détectable par un outil. Il ne survit pas à une réécriture — ce que montrent les chiffres publiés.

Ces taux sont **annoncés par OpenAI**, sans réplication indépendante connue : ils disent la performance d'un procédé sur un jeu de test, pas la garantie d'un marquage en production. Le point pratique est ailleurs : dans l'API — pour tout éditeur qui intègre le modèle dans son produit —, le filigrane reste **désactivé par défaut**.[^3] Un intégrateur qui ne touche à rien ne peut donc pas invoquer le marquage d'OpenAI : la conformité se joue sur un paramètre de configuration, pas sur un contrat.

## Ce qu'une entreprise doit pouvoir démontrer

L'article 4 impose une alphabétisation : s'assurer que le personnel comprend ce qu'un système d'IA fait et ne fait pas. Comme toute obligation de moyens, elle se démontre par des traces — une politique écrite, un registre de formation, une procédure.

Deux enquêtes suggèrent que ce socle documentaire manque encore. Côté mondial, une étude de GFT auprès de 945 directions informatiques conclut que 84 % ont annulé au moins un projet d'IA à cause de leurs systèmes existants.[^4] Côté français, le baromètre Coface et Les Échos Études, mené auprès de 900 décideurs, indique que 60 % des entreprises n'ont aucun cadre formel d'usage de l'IA, et 17 % seulement une politique définie.[^5]

> **En clair**
> Les **codes de pratique** sont les textes volontaires que la Commission négocie avec les fournisseurs pour préciser comment se conformer au règlement. Ils ne remplacent pas la loi, mais ils disent comment la Commission l'interprétera.

À cette asymétrie s'en ajoute une autre, entre États membres. L'Allemagne a désigné son autorité de surveillance, la Bundesnetzagentur, par une loi en vigueur depuis le 29 juillet 2026. En France, au 6 octobre, le projet de loi de mise en conformité (DDADUE) n'avait ni rapport ni texte adopté en commission à l'Assemblée.[^2] Une entreprise française sait donc à quelles règles elle est soumise, sans savoir à quelle autorité s'adresser.

## Deux régimes qui ne se parlent pas

Le parallèle américain éclaire le texte européen par contraste. Google, OpenAI et Anthropic travailleraient à un organisme volontaire, « Frontier AI Standards » — tests avant déploiement, déclaration d'incidents, qualification des auditeurs —, sur le modèle de la FINRA, sans gouvernement à la direction.[^6][^7] Washington, de son côté, a renommé l'IA « super intelligence » par décret et annoncé une force de coordination.[^8][^9] Un texte opposable d'un côté, un référentiel privé de l'autre.

## Ce que l'on ne sait pas

- **Le texte consolidé n'a pas pu être téléchargé depuis ce poste** : le serveur EUR-Lex renvoie une page d'attente. Les références d'articles citées ici proviennent donc de sources secondaires renvoyant au règlement, pas du texte lui-même.[^10]
- **La date d'application de l'article 4** n'a pas pu être vérifiée ; elle est laissée vide dans le tableau plutôt que déduite.
- **Le contenu des échéances du 2 décembre 2026 et du 2 août 2027** n'est pas détaillé par les sources consultées.
- **La liste des destinataires des demandes de l'article 91 n'est pas confirmée** par la Commission : le chiffre de « plus de 30 entreprises » repose sur une **source unique**, une note du Cloud Security Alliance.[^1]
- **Le calendrier réglementaire et le filigrane reposent, dans cette note, sur une source unique** — ActuIA —, qui s'appuie sur le texte du règlement et le rapport technique d'OpenAI, non consultés directement ici.[^2][^3]
- **Les taux de détection du filigrane sont annoncés par OpenAI**, sans réplication indépendante connue.
- **« Frontier AI Standards »** reste un nom provisoire : périmètre et statut juridique non confirmés, et les sources divergent sur la date de l'information (15 ou 26 septembre).[^6][^7]
- **Le décret américain** n'a pas pu être lu dans son intégralité : la fiche de la Maison-Blanche était tronquée, et la portée juridique de la « Super Intelligence Force » repose sur la presse.[^8][^9]

[^1]: Cloud Security Alliance, « EU AI Act: first enforcement RFIs » — https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-first-enforcement-rfis-20261001/

[^2]: ActuIA, « AI Act : obligations in force and delays under omnibus 2026/1744 » — https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/

[^3]: ActuIA, « OpenAI will watermark ChatGPT in the EU, but leaves the API opt-in » — https://www.actuia.com/en/news/openai-will-watermark-chatgpt-in-the-eu-but-leaves-the-api-opt-in/

[^4]: GFT Technologies, « New AI research from GFT Technologies » — https://www.gft.com/us/en/about-us/newsroom/press-and-news/2026/press-releases/new-ai-research-from-gft-technologies

[^5]: ActuIA (baromètre Coface et Les Échos Études), « Six in ten French companies have no AI framework » — https://www.actuia.com/en/news/six-in-ten-french-companies-have-no-ai-framework-coface/

[^6]: WION, « Google, OpenAI and Anthropic are building their own AI regulator, with no government in it » — https://www.wionews.com/world/google-openai-and-anthropic-are-building-their-own-ai-regulator-with-no-government-in-it-1790428130541

[^7]: Ahram Online, « Frontier AI Standards » — https://english.ahram.org.eg/UI/Front/Inner.aspx?NewsContentID=576758

[^8]: Kazinform, « Trump announces Super Intelligence Force to coordinate US AI policy » — https://qazinform.com/news/trump-announces-super-intelligence-force-to-coordinate-us-ai-policy-906133

[^9]: Maison-Blanche, « President Donald J. Trump inaugurates the era of Super Intelligence » — https://www.whitehouse.gov/fact-sheets/2026/09/fact-sheet-president-donald-j-trump-inaugurates-the-era-of-super-intelligence/

[^10]: Règlement (UE) 2024/1689 (texte de référence, non téléchargé depuis ce poste) — https://eur-lex.europa.eu/eli/reg/2024/1689/oj
