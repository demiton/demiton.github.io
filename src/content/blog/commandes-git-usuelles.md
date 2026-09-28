---
title: Commandes Git usuelles
description: "Mémo des commandes Git du quotidien : créer et supprimer des branches, gérer les remotes, annuler des commits et nettoyer l’historique."
date: 2018-01-19
category: Git
tags: [git, programmation]
cover: /covers/commandes-git-usuelles.svg
draft: false
---

## Annuler les modif

```
git commit --amend -m Nouveau message pour le commit
```

## Créer une branche

```
git branch nom_branche
```

## Afficher la liste des branches (locales et en ligne)

```
git branch -v -a
```

## Mettre la branche en ligne pour la premiere fois

```
git push -u origin nom_branche
```

## Supprimer une branche

```
git branch -D nom_branche
```

## Ajouter une remote branch

```
git checkout -b nom_branche origin/nom_branche
```

  
ou bien :

```
git checkout --track origin/nom_branche
```

## Pour forcer le passage de la branche courante à la branche master

```
git checkout -f master
```

## Pour annuler les commits

```
git revert HEAD
```

ou bien :

```
git stash save --keep-index
git stash drop
```

(Pour récupérer un stash : `git stash apply` )

ou bien :

```
git clean -n
git clean -f
git reset --hard HEAD~1
```

## Pour supprimer un fichier indésirable du dépot et dans tous les commits

```
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch _post/2018-01-20-Commandes-Git-essentielles.md' --prune-empty --tag-name-filter cat -- --all
git push -f
```

Remarque : Git va demander de faire un pull avant, ce qu’il faut refuser avec un `git push -f`

## Mise à jour de la liste des branches du dépot en ligne (remote branches)  
git remote update

## Ajouter un fichier `.gitignore` afin de ne pas prendre en compte certain fichiers et dossiers des commits

A la racine du projet, il est possible d’ajouter un fichier `.gitignore` et d’y ajouter les fichiers ou dossier à exclure des commits.  
Par exemple , nous pourrons avoir :

.gitignore :

```
monfichier
mondossier/exemple.txt
mondossier/unDossierEntier/
/*.txt # tout les fichiers txt dans le répertoire /
**/monSousDossier/** # tous les fichiers contenus dans tous les dossiers monSousDossier du dépot
```

## Ignorer des fichiers déja commités

DAns le cas où les fichiers que l’on souhaite ignorer sont déja présent dans le dépot, il va falloir les supprimer de l’historique pour que le gitignore fonctionne.  
On utilisera la methode présentes dans le point suivant

## Supprimer des fichiers de l’historique d’un dépot Git

Pour un fichier `monFichier.txt` , on appliquera la commande :

```
find . -name monFichier.txt -print0 | xargs -0 git rm -f --ignore-unmatch
git add .
git commit -am " monFichier.txt supprimé de l'historique du dépot
```

## Supprimer un dossier récurrent ( présent dans plusieurs sous-dossier) de l’historique d’un dépot Git

Exemple pour le dossier `node_modules/` :

```
git rm -r --cached **/node_modules/**
```

ne pas oublier d’ajouter dans le `.gitignore` :

```
node_modules/
```

Puis faire :

```
git add .
git commit -am " Suppression récursive des dossiers node_modules du dépot"
```

## Effacer tout l’historique des commits du dépot git

## Créer une branch temporaire sans parent ( avec l’option –orphan )

```
git checkout --orphan TEMP_BRANCH
```

## Ajouter les fichier et commit les changements

```
git add -A
git commit -am "Initial commit"
```

## Supprimer la branch master et autres branches( si necessaire)

```
git branch -D master
```

## Renommer la nouvelle branch en master

```
git branch -m master
```

## Forcer enfin les modifs sur le master

```
git push -f origin master
```

## Configurer son dépot Git

Afin d’être identifiable par les serveurs distants ( Bitbucket, Github, …), il est necessaire d’entrer quelques informations :

```
git config --global user.name "Mona Lisa"
git config --global user.email "email@example.com"
git config --global http.proxy http://MonNom:MonMotDePasse@AdresseDuProxy:8080/
```

Remarque :

- Eviter les caractères @ dans le mot de passe car il y aurait des confusions dans le paramétrage du proxy  
- Ces inforamtions sont stockées en clair dans le `.gitconfig` situé généralement dans son home à la racine du profil (`/home/user/`).

## Pour enregistrer son mot de passe dans un fichier credential

pour eviter de le retaper à chaque fois, taper

```
git config credential.helper store
```

Quand vous vous connecterez à votre compte, Git enregistrera le mot de passe .

Remarques :  
- De la même manière que pour le `.gitconfig`, git créé un fichier caché : `git-credentials` contenant vos clefs. Ce fichier est généralement situé à la racine du profil utilisateur : `~/.git-credentials`.

- Les mots de passe y sont stockés en clair, attention donc à ce que le mot de passe choisi soit bien unique et n’ouvre pas d’autres portes. Solution à éviter donc si l’ordinateur n’est pas personnel, bien réfléchir alors aux questions de sécurité.

## Pour enregistrer son mot de passe de manière temporaire

```
git config --global credential.helper 'cache --timeout 3600'
```

## Pour supprimer ou modifier la configuration global de git.

On accède au `.gitconfig` via la commande :  
On peut modifier alors directement les informations via le terminal.

```
git config --global --edit
```

## Pour passer de github à bitbucket

On clone la derniere version du dépot git, puis on renomme le dossier ( si nécessaire)  
Ensuite il faut changer la destination et pointer vers le nouveau dépôt

```
git remote add bitbucket git@bitbucket.org:your_user/your_repo.git
git push -u origin master
```

### Remarque  
Si vous obtenez l’erreur :  
`fatal: remote origin already exists.`

Pour voir vers ou point le dépot vous pouvez taper :

```
git remote -v
```

Il est possible alors que la remote origin pointe vers github alors que l’on souhaite pointe vers bitbucket

On écrit alors :

```
git remote rm origin
```

Une fois la remote origin effacée on peut relancer la premiere procédure

Par exemple :

```
git remote -v
git remote rm origin
git remote add bitbucket UserName@bitbucket.org:UserName/ProjetName/MonRepo.git
git push -u origin master
```

## Pour débloquer la verification de Eslint

Dans le cas ou Eslint bloquerait le push de commit à cause d’une syntaxe non acceptée, on peut toujours passer au travers avec la commande

```
git --no-verify -m " mon message"
```
