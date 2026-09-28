---
title: Installer Docker dans une virtualBox debian Jessie sous linux
description: "Installer Docker dans une machine virtuelle Debian Jessie sous VirtualBox, avec un hôte Linux."
date: 2018-07-29
category: DevOps
tags: [docker, virtualbox, debian]
cover: /covers/installer-docker-dans-une-virtualbox-debian-jessie-sous-linux.svg
draft: false
---

Il peut sembler utile voir bien pratique de pouvoir installer docker à l’interieur d’un machine virtuelle.  
L’opération est compromise sous windows car la vitualisation fait appel obligatoirement à Hyper-V.  
Voir : [https://stackoverflow.com/questions/44337460/docker-inside-virtualbox](https://stackoverflow.com/questions/44337460/docker-inside-virtualbox)

Nous allons tenter l’installation avec un pc tournant sous fedora 28 dont on a désactiver Hyper-V depuis le bios.  
L’installation de la VM Debian Jessie est faite via vagrant.

## Installation de Docker

[Lien vers la documentation officielle](https://docs.docker.com/install/linux/docker-ce/debian/#prerequisites)

```
sudo apt-get update
sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
sudo apt-get install docker-ce
sudo docker run hello-world
```
