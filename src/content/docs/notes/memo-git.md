---
title: Mémo Git
description: Les commandes Git du quotidien, prêtes à copier-coller.
---

## Au quotidien

```bash
# État et historique compact
git status
git log --oneline --graph --decorate -20

# Nouvelle branche de travail
git switch -c feature/ma-feature

# Commit rapide avec tous les fichiers suivis
git commit -am "fix: corrige le tri des dates"
```

## Rattrapage express

```bash
# Modifier le dernier commit (message + contenu)
git commit --amend

# Annuler le dernier commit en gardant les changements
git reset --soft HEAD~1

# Récupérer une branche distante à jour
git pull --rebase origin main
```

## Branches

```bash
# Lister les branches fusionnées
git branch --merged main

# Nettoyer les branches locales fusionnées
git branch --merged main | grep -v 'main' | xargs git branch -d
```

:::tip
`git log --oneline --graph` combiné à un alias (`git config --global alias.lg "log --oneline --graph --decorate"`) rend l'historique lisible en une commande.
:::

:::caution
`git reset --hard` détruit les changements non commités. Vérifie avec `git status` avant de l'utiliser.
:::
