---
title: Installer Python via Anaconda sur Ubuntu 18.04
description: "Installer Anaconda sur Ubuntu, configurer conda, gérer des environnements virtuels et lancer Jupyter : le guide complet, pas à pas."
date: 2021-05-03
category: Programmation
tags: [python, anaconda, ubuntu, conda, jupyter]
cover: /covers/anaconda_logo.png
draft: false
---

[Anaconda](https://www.anaconda.com/download) est une distribution Python « tout-en-un » : l'interpréteur, le gestionnaire de paquets **conda**, le gestionnaire d'environnements virtuels, et une pile scientifique pré-installée (NumPy, pandas, Jupyter…). C'est un bon choix quand on veut un Python qui fonctionne immédiatement, sans assembler pip + venv + dépendances système à la main.

> Ce guide a été écrit pour Ubuntu 18.04 mais les étapes sont identiques sur les versions plus récentes (20.04, 22.04, 24.04).

## 1. Prérequis

- Ubuntu 18.04 ou plus récent, architecture 64 bits (`uname -m` doit afficher `x86_64`)
- Environ 5 Go d'espace disque disponible
- `wget` et `sha256sum` (installés par défaut sur Ubuntu)

## 2. Télécharger l'installateur

Rendez-vous sur [la page de téléchargement d'Anaconda](https://www.anaconda.com/download) et copiez le lien du **Linux 64-bit installer** (fichier `.sh`), puis téléchargez-le :

```bash
wget https://repo.anaconda.com/archive/Anaconda3-XXXX.XX-Linux-x86_64.sh
```

Vérifiez son intégrité en comparant la somme SHA-256 affichée sur le site avec celle du fichier téléchargé :

```bash
sha256sum Anaconda3-XXXX.XX-Linux-x86_64.sh
```

## 3. Lancer l'installation

```bash
bash Anaconda3-XXXX.XX-Linux-x86_64.sh
```

L'installeur vous posera trois questions :

1. **La licence** : appuyez sur `Entrée` pour la faire défiler, puis tapez `yes`.
2. **L'emplacement d'installation** : le dossier par défaut `~/anaconda3` convient dans la plupart des cas — validez avec `Entrée`.
3. **« Do you wish to run conda init? »** : répondez `yes`. C'est l'étape importante : `conda init` ajoute une ligne dans votre `~/.bashrc` pour rendre la commande `conda` disponible dans tous vos terminaux.

Pour une installation sans interaction (utile en script) :

```bash
bash Anaconda3-XXXX.XX-Linux-x86_64.sh -b -p ~/anaconda3
~/anaconda3/bin/conda init
```

## 4. Rendre conda disponible

Rechargez votre profil pour prendre en compte les modifications du `.bashrc` :

```bash
source ~/.bashrc
```

Vous devriez alors voir `(base)` en début de prompt : c'est l'environnement par défaut d'Anaconda, activé automatiquement. Si cela vous agace, vous pouvez désactiver ce comportement (les commandes restent accessibles) :

```bash
conda config --set auto_activate_base false
```

À noter : si vous aviez l'habitude d'ajouter Anaconda au `PATH` à la main avec `export PATH=~/anaconda3/bin:$PATH`, sachez que `conda init` le fait proprement et permet en plus de profiter des environnements virtuels — préférez-la.

## 5. Vérifier l'installation

```bash
conda --version
python --version
which python
```

`which python` doit pointer vers `~/anaconda3/bin/python`, ce qui confirme que c'est bien le Python d'Anaconda qui est utilisé.

## 6. Créer un environnement virtuel

C'est la bonne pratique numéro un : un environnement par projet, avec ses propres versions de Python et de ses dépendances, sans interférer avec le système ni les autres projets.

```bash
# Créer un environnement nommé "monprojet" avec Python 3.11
conda create -n monprojet python=3.11

# L'activer
conda activate monprojet

# Installer des paquets dedans
conda install numpy pandas matplotlib

# Le quitter
conda deactivate
```

## 7. Jupyter Notebook et JupyterLab

Jupyter est installé avec Anaconda. Une fois votre environnement activé :

```bash
jupyter lab        # ou : jupyter notebook
```

Le navigateur s'ouvre automatiquement sur l'interface, avec le bon interpréteur Python (celui de l'environnement activé).

## 8. Anaconda Navigator (interface graphique)

Si vous préférez une interface graphique, **Anaconda Navigator** permet de gérer les environnements, installer des librairies et lancer Jupyter sans passer par le terminal :

```bash
anaconda-navigator
```

Pour l'ajouter au lanceur d'applications d'Ubuntu, créez le fichier `anaconda-navigator.desktop` (adaptez les chemins à votre nom d'utilisateur) :

```ini
#!/usr/bin/env xdg-open
[Desktop Entry]
Name=Anaconda Navigator
Version=3.0
Type=Application
Exec=/home/demiton/anaconda3/bin/anaconda-navigator
Icon=/home/demiton/anaconda3/lib/python3.8/site-packages/anaconda_navigator/static/images/anaconda-logo.svg
Comment=Open Anaconda Navigator
Terminal=false
```

Puis copiez-le dans le dossier des applications :

```bash
mv anaconda-navigator.desktop ~/.local/share/applications/
```

## 9. Mémo des commandes conda

| Commande | Rôle |
| --- | --- |
| `conda env list` | Lister les environnements |
| `conda create -n nom python=3.11` | Créer un environnement |
| `conda activate nom` / `conda deactivate` | Activer / quitter un environnement |
| `conda install paquet` | Installer un paquet dans l'environnement actif |
| `conda update --all` | Mettre à jour les paquets de l'environnement actif |
| `conda clean -a` | Nettoyer le cache et les archives |
| `conda info` | Afficher la configuration courante |

Pour aller plus loin, la [documentation officielle de conda](https://docs.conda.io/) est claire et complète.
