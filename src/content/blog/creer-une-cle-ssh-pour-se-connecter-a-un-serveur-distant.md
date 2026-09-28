---
title: Créer une clé ssh pour se connecter à un serveur distant
description: "Générer une paire de clés SSH et la déposer sur un serveur distant pour s’y connecter sans mot de passe."
date: 2024-09-05
category: Divers
tags: [ssh, linux, serveur]
cover: /covers/creer-une-cle-ssh-pour-se-connecter-a-un-serveur-distant.svg
draft: false
---

Pour créer une clé SSH et l’utiliser pour se connecter à un serveur distant, voici les étapes à suivre sur un système Linux ou macOS (les étapes sont similaires sur Windows en utilisant Git Bash ou WSL) :

### 1. Générer une clé SSH

Ouvrez un terminal et exécutez la commande suivante :

```bash
ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
```

-   `-t rsa` spécifie que vous voulez une clé de type RSA.
-   `-b 4096` indique la taille de la clé en bits (4096 est recommandé pour plus de sécurité).
-   `-C "votre_email@example.com"` ajoute un commentaire (votre adresse e-mail, par exemple).

### 2. Indiquer où sauvegarder la clé

Il vous sera demandé où sauvegarder la clé générée. Par défaut, elle sera sauvegardée dans le répertoire `~/.ssh/id_rsa`.

```
Enter file in which to save the key (/home/your_user/.ssh/id_rsa):
```

Appuyez simplement sur `Entrée` si vous souhaitez l’enregistrer à cet emplacement par défaut.

### 3. Définir une passphrase (facultatif)

Vous pouvez choisir de protéger votre clé SSH avec une passphrase, ce qui ajoute une couche supplémentaire de sécurité. Sinon, vous pouvez appuyer sur `Entrée` pour laisser le champ vide.

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

### 4. Ajouter la clé SSH à l’agent SSH

Pour charger automatiquement votre clé SSH dans l’agent, exécutez les commandes suivantes :

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

### 5. Copier la clé publique vers le serveur distant

Ensuite, vous devez copier la clé publique (`~/.ssh/id_rsa.pub`) sur le serveur distant. Vous pouvez utiliser la commande suivante pour l’envoyer directement :

```bash
ssh-copy-id utilisateur@ip_du_serveur
```

Remplacez `utilisateur` par votre nom d’utilisateur sur le serveur et `ip_du_serveur` par l’adresse IP du serveur distant.

### 6. Se connecter au serveur

Après avoir copié la clé, vous pouvez vous connecter au serveur sans mot de passe avec la commande :

```bash
ssh utilisateur@ip_du_serveur
```

C’est tout ! Vous avez maintenant configuré une connexion SSH sécurisée avec une clé publique/privée.

Si vous avez des questions ou avez besoin d’ajuster certains paramètres, n’hésitez pas à demander.
