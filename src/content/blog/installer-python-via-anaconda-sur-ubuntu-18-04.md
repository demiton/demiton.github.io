---
title: Installer Python via Anaconda sur Ubuntu 18.04
description: "Installer la distribution Anaconda sur Ubuntu 18.04 et ajouter ses outils au PATH pour utiliser Python et Jupyter partout."
date: 2021-05-03
category: Divers
tags: [python, anaconda, ubuntu]
cover: /covers/anaconda_logo.png
draft: false
---

[La plateforme Anaconda](https://www.anaconda.com/products/individual) est un écosystème en partie open-source très pratique pour l’installation de python, ses dépendences et autres frameworks comme jupyter-notebook.

Pour installer Anaconda :

```
wget https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh
sh Anaconda3-2020.11-Linux-x86_64.sh
```

Une fois Anaconda installé , on va ajouter les executables (bin) d’anaconda dans le profile pour qu’ils puissent etre appeler n’importe où

```
export PATH=~/anaconda3/bin:$PATH
```

Python 3.8 étant installé par défaut par anaconda, nous pouvons alors l’appeler directement

```
python --version
Python 3.8.5
```

Nous allons aussi retrouver **anaconda-navigator** qui est l’interface graphique depuis laquelle nous pouvons piloter la platforme anaconda, installer des librairies comme tensorflow, ou encore lancer des framework comme jupyter Notebook ou Jupyter Lab .

Pour lancer Anaconda Navigator en ligne de commande, il suffira de taper :

```
anaconda-navigator &
```

Pour avoir le navigateur anaconda dans le lanceur d’application d’Ubuntu nous devrons créer un script `anaconda-navigator.desktop` ( avec les bons chemins vers l’application et le logo):

```
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

On copie/colle en suite le fichier dans le dossier des applications :

```
mv anaconda-navigator.desktop ~/.local/share/applications/
```
