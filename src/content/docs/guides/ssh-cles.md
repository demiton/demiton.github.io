---
title: Se connecter en SSH par clés
description: VPS, GitHub et GitLab — paquets Debian et Fedora, génération de la paire, dépôt de la clé, durcissement de sshd et dépannage.
sidebar:
  label: SSH par clés
---

Cette page montre comment authentifier une connexion SSH avec une paire de
clés — sans mot de passe — depuis un poste Linux vers :

1. un VPS Linux dont tu es administrateur ;
2. GitHub et GitLab, pour `git clone` et `git push` en SSH.

Les commandes marchent sur Debian, Ubuntu, Fedora, RHEL, Arch, etc. Les
différences côté serveur (nom du service, emplacement de la configuration)
sont signalées au passage.

**Conventions utilisées dans les exemples**

| Symbole | Signification |
| --- | --- |
| `alice` | ton compte sur le poste **et** sur le VPS |
| `203.0.113.10` | IP du VPS (adresse de documentation, à remplacer) |
| `vps.example.com` | nom DNS du VPS, quand il y en a un |
| `~/.ssh/id_ed25519` | clé **privée** ; `~/.ssh/id_ed25519.pub` est la publique |

:::note
Les adresses `203.0.113.0/24` sont réservées à la documentation (RFC 5737) :
aucun trafic réel ne peut y aboutir, elles sont sûres à recopier.
:::

**Version express** — le chemin heureux, détaillé plus bas :

```bash
# Debian/Ubuntu : sudo apt install -y openssh-client git
# Fedora : sudo dnf install -y openssh-clients git

# poste → VPS
ssh-keygen -t ed25519 -a 100 -C "alice@portable-2026-11"
ssh-copy-id alice@203.0.113.10
ssh alice@203.0.113.10

# poste → GitHub / GitLab : coller la clé publique dans les réglages SSH du compte
ssh -T git@github.com     # ou : ssh -T git@gitlab.com
```

**Par où commencer ?** Section 2 pour les paquets, sections 3 à 6 pour le VPS
(création de la clé, dépôt, premier test, durcissement). Sections 8 et 9 pour
GitHub et GitLab — la même paire de clés peut servir partout, mais une clé par
usage est plus facile à révoquer. Section 11 quand une connexion échoue,
section 13 pour la checklist.

---

## 1. Le principe, en une image

Une paire de clés, c'est deux fichiers mathématiquement liés :

- la **clé privée** reste sur ton poste, personne ne la voit jamais ;
- la **clé publique** se copie sans risque sur les serveurs et les forges.

Le serveur ne « reçoit » pas la clé privée. Il envoie un défi aléatoire ; le
poste le signe avec la clé privée ; le serveur vérifie la signature avec la
clé publique qu'il détient :

```
  POSTE                                   VPS
  ┌────────────────────┐                  ┌──────────────────────────┐
  │ clé privée         │                  │ authorized_keys          │
  │ ~/.ssh/id_ed25519  │                  │ = clé PUBLIQUE de alice  │
  └─────────┬──────────┘                  └─────────────┬────────────┘
            │ 1. « je veux me connecter »               │
            │──────────────────────────────────────────▶│
            │ 2. défi aléatoire                          │
            │◀──────────────────────────────────────────│
            │ 3. défi signé avec la clé privée           │
            │──────────────────────────────────────────▶│
            │                                            │ 4. vérifie avec
            │                                            │    la clé publique
```

Deux paires de clés différentes entrent en jeu, et il ne faut pas les
confondre :

| Paire | Qui la crée | À quoi elle sert | Où elle vit |
| --- | --- | --- | --- |
| **clé utilisateur** | toi | prouver **qui tu es** | privée sur ton poste ; publique dans `authorized_keys` ou sur la forge |
| **clé d'hôte** | le serveur (à l'installation) | prouver **quel serveur tu contactes** | privée sur le serveur ; empreinte mémorisée dans `~/.ssh/known_hosts` |

C'est la clé d'hôte qui produit le message *« The authenticity of host … can't
be established »* au premier contact. On la vérifie une fois, puis SSH refuse
silencieusement de continuer si elle change — c'est la protection contre
l'homme du milieu.

**Ce qui circule, et ce qui ne circule jamais**

| Élément | Peut être copié sur un serveur ? | Peut être publié ? |
| --- | --- | --- |
| clé privée | **non, jamais** | **jamais** |
| clé publique | oui, c'est fait pour | oui |
| passphrase | non, elle ne quitte pas le poste | non |
| empreinte de clé (fingerprint) | oui | oui |

---

## 2. Installer les paquets (Debian, Fedora)

Tout vient des dépôts de la distribution, rien à compiler. Sur le **poste**,
il faut le client SSH et Git ; sur le **VPS**, le serveur SSH, et Git
seulement si la machine doit cloner des dépôts.

### 2.1 Debian et Ubuntu

```bash
sudo apt update
sudo apt install -y openssh-client git rsync
```

Sur le VPS, ajoute le serveur, le pare-feu et un outil de test de port :

```bash
sudo apt install -y openssh-server ufw netcat-openbsd
# facultatif : bannir les IP qui accumulent les échecs
sudo apt install -y fail2ban
```

Sur une image minimale, `sudo` peut manquer ; installe-le en root :

```bash
su -
apt update && apt install -y sudo
usermod -aG sudo alice      # si le compte existe déjà
```

Le paquet **`openssh-client`** contient tout le client : `ssh`, `ssh-keygen`,
`ssh-agent`, `ssh-add`, `ssh-copy-id`, `ssh-keyscan`, `scp`, `sftp`. Le serveur
est dans **`openssh-server`**. Vérifie :

```bash
ssh -V
dpkg -l openssh-client openssh-server | grep '^ii'
```

### 2.2 Fedora (et RHEL, Rocky, AlmaLinux)

```bash
sudo dnf install -y openssh-clients git rsync
```

Sur le VPS :

```bash
sudo dnf install -y openssh-server firewalld nmap-ncat
# facultatif
sudo dnf install -y fail2ban
```

Le client complet est dans **`openssh-clients`** (au pluriel) : mêmes outils
que côté Debian, `ssh-copy-id` compris. Le serveur est dans
**`openssh-server`**. Vérifie :

```bash
ssh -V
rpm -q openssh-clients openssh-server
```

Sur RHEL, Rocky ou AlmaLinux, `fail2ban` vient d'EPEL :
`sudo dnf install -y epel-release` avant l'installation. Depuis Fedora 41,
`dnf` est en réalité `dnf5` ; la commande ne change pas.

### 2.3 Démarrer le serveur (VPS)

À l'installation, ou au premier démarrage, `openssh-server` génère les clés
d'hôte dans `/etc/ssh/ssh_host_*` ; il reste à démarrer le service.

```bash
# Debian, Ubuntu
sudo systemctl enable --now ssh
sudo systemctl status ssh --no-pager

# Fedora, RHEL
sudo systemctl enable --now sshd
sudo systemctl status sshd --no-pager
```

Vérifie qu'il écoute :

```bash
ss -tlnp | grep ':22 '
```

Si rien n'apparaît : service arrêté, autre port
(`sudo sshd -T | grep -i '^port'`), ou `sshd` absent. `ss` vient de
`iproute2`, présent par défaut sur les deux distributions.

### 2.4 Récapitulatif

| Besoin | Debian / Ubuntu | Fedora / RHEL |
| --- | --- | --- |
| client SSH (`ssh`, `ssh-keygen`, `ssh-copy-id`…) | `openssh-client` | `openssh-clients` |
| serveur SSH (`sshd`) | `openssh-server` | `openssh-server` |
| Git | `git` | `git` |
| copies | `rsync` | `rsync` |
| pare-feu | `ufw` | `firewalld` |
| test de port | `netcat-openbsd` | `nmap-ncat` |
| anti-bruteforce (facultatif) | `fail2ban` | `fail2ban` |
| élévation de droits | `sudo` | `sudo` |

Les images cloud Debian et Fedora embarquent déjà le client et le serveur : si
`ssh -V` répond et que le service tourne, passe directement à la suite. Les
noms ci-dessus valent pour Debian 12/13 et Fedora 41 et suivants.

---

## 3. Générer la paire sur le poste

### 3.1 Vérifier qu'il n'y a pas déjà une clé

```bash
ls -al ~/.ssh
```

S'il existe déjà `id_ed25519` (ou `id_rsa`), ne l'écrase pas : soit tu la
réutilises, soit tu en crées une seconde avec un nom explicite (section 10).
Pour afficher la clé publique d'une clé existante :

```bash
cat ~/.ssh/id_ed25519.pub
```

### 3.2 Créer la clé

```bash
ssh-keygen -t ed25519 -a 100 -C "alice@portable-2026-11"
```

Détail des options :

| Option | Rôle |
| --- | --- |
| `-t ed25519` | algorithme recommandé : rapide, clés courtes, sûr |
| `-a 100` | nombre d'itérations de dérivation (KDF) qui protège la clé au repos ; 16 par défaut, 100 ralentit une attaque par dictionnaire |
| `-C "…"` | commentaire : un libellé lisible dans le fichier `.pub`, pour savoir d'où vient la clé |

`ssh-keygen` demande trois choses :

1. **où enregistrer la clé** — `Entrée` accepte `~/.ssh/id_ed25519` ;
2. **une passphrase** — choisis une phrase de plusieurs mots, pas un mot de
   dictionnaire. Elle chiffre la clé privée sur le disque ;
3. **la confirmation** de la passphrase.

Une passphrase vide est acceptée, mais alors quiconque lit le fichier (vol,
sauvegarde, session partagée) peut se connecter partout où la clé est
autorisée. Sur un portable, la passphrase n'est pas optionnelle.

Résultat :

```
~/.ssh/id_ed25519       clé privée   (chmod 600)
~/.ssh/id_ed25519.pub   clé publique (chmod 644)
```

Une clé publique ressemble à ceci — **une seule ligne**, préfixe compris :

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI… alice@portable-2026-11
```

### 3.3 Vérifier et afficher l'empreinte

```bash
ssh-keygen -lf ~/.ssh/id_ed25519.pub
# 256 SHA256:AbCdEf… alice@portable-2026-11 (ED25519)
```

Cette empreinte est ce que GitHub, GitLab et les consoles de VPS affichent
souvent : elle permet de vérifier qu'on a bien déposé la bonne clé, sans
comparer les longues chaînes de caractères.

### 3.4 Charger la clé dans l'agent (pour ne pas retaper la passphrase)

L'agent SSH garde les clés déverrouillées en mémoire pour la session :

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l          # liste les clés chargées
```

Sans agent, la passphrase est redemandée à chaque connexion, `git push`
compris. L'agent meurt à la fermeture de la session (ou au redémarrage) ; il
suffit de relancer les deux commandes. Pour l'automatiser à chaque nouvelle
clé utilisée, ajoute `AddKeysToAgent yes` dans `~/.ssh/config` (section 7).

### 3.5 Et si le système est ancien ?

Ed25519 est disponible depuis OpenSSH 6.5 (2014). Si un vieux système ne le
supporte pas, utilise RSA 4096 :

```bash
ssh-keygen -t rsa -b 4096 -a 100 -C "alice@portable-2026-11"
```

N'utilise ni DSA (cassé, refusé par GitHub depuis 2022) ni ECDSA sans raison
précise (mêmes familles de risques que DSA, et aucun avantage pratique sur
Ed25519).

---

## 4. Poser la clé publique sur le VPS

### 4.1 Créer un compte non-root (si le VPS n'a que `root`)

Sur le VPS, connecté en root :

```bash
adduser alice                  # Debian, Ubuntu
# useradd -m -s /bin/bash alice  # Fedora, RHEL, Arch
usermod -aG sudo alice      # Debian, Ubuntu
# usermod -aG wheel alice   # Fedora, RHEL, Arch
```

Travailler avec un compte non-root qui utilise `sudo` limite les dégâts d'une
erreur de commande et permet de couper complètement l'accès root (section 6).

### 4.2 Méthode automatique : `ssh-copy-id`

Depuis le poste :

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub alice@203.0.113.10
```

La commande demande **une fois** le mot de passe du compte, puis ajoute la
clé publique à `~/.ssh/authorized_keys` et fixe les permissions. Avec un port
non standard :

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 2222 alice@203.0.113.10
```

### 4.3 Méthode manuelle

Utile quand l'authentification par mot de passe est déjà coupée, ou quand la
console du fournisseur est le seul accès.

Depuis le poste :

```bash
cat ~/.ssh/id_ed25519.pub | ssh alice@203.0.113.10 \
  'umask 077; mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys'
```

Le `umask 077` garantit que les fichiers créés ne sont lisibles que par le
compte. Si tu n'as pas d'accès SSH du tout, colle la ligne publique dans la
console web du fournisseur (ou dans « SSH keys » à la création du VPS) : la
plupart des hébergeurs acceptent une clé publique au déploiement.

### 4.4 Permissions : l'erreur numéro un

`sshd` refuse d'utiliser des fichiers auxquels d'autres comptes pourraient
écrire (`StrictModes yes` par défaut). Sur le VPS :

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod g-w,o-w ~          # le dossier personnel ne doit pas être inscriptible par le groupe/les autres
ls -ld ~ ~/.ssh ~/.ssh/authorized_keys
```

Attendu :

```
drwx------  ~/.ssh
-rw-------  ~/.ssh/authorized_keys
```

Sur Fedora, RHEL ou toute machine avec SELinux, le contexte doit être
`ssh_home_t`, sinon la clé est ignorée sans message clair :

```bash
sudo restorecon -R -v ~/.ssh
ls -Z ~/.ssh/authorized_keys
```

Chaque clé autorisée occupe **une ligne entière** de `authorized_keys`. Un
copier-coller qui coupe la ligne, ou qui la colle deux fois, casse le fichier
ou crée un doublon.

---

## 5. Premier test, et vérification de l'hôte

```bash
ssh -i ~/.ssh/id_ed25519 alice@203.0.113.10
```

Au premier contact, SSH affiche l'empreinte de la **clé d'hôte** du VPS :

```
The authenticity of host '203.0.113.10' can't be established.
ED25519 key fingerprint is SHA256:…
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Ne réponds pas « yes » à l'aveugle. Compare l'empreinte avec une source
fiable : la console du fournisseur, ou, sur le VPS lui-même, la commande

```bash
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Une fois la réponse `yes`, l'empreinte est mémorisée dans `~/.ssh/known_hosts`
et la question ne revient plus.

Pour vérifier que l'authentification par clé fonctionne **sans** mot de passe,
force le mode clé :

```bash
ssh -o PreferredAuthentications=publickey -o PasswordAuthentication=no \
    -i ~/.ssh/id_ed25519 alice@203.0.113.10
```

Si cette commande ouvre la session, tu peux couper l'authentification par mot
de passe. Si elle échoue alors que `ssh` simple fonctionne, c'est que le mot
de passe était encore utilisé : ne coupe rien avant d'avoir corrigé.

---

## 6. Durcir le VPS (recommandé)

### 6.1 La configuration, par un fichier séparé

Sur Debian, Ubuntu, Fedora et RHEL récents, `sshd_config` inclut
`/etc/ssh/sshd_config.d/*.conf`. Vérifie-le au besoin avec
`grep Include /etc/ssh/sshd_config`, puis crée un fichier dédié plutôt que
d'éditer le fichier principal :

```conf
# /etc/ssh/sshd_config.d/00-durcissement.conf
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
```

`KbdInteractiveAuthentication` est le nom actuel de l'option ; sur
d'anciens systèmes (OpenSSH antérieur à 8.7), elle s'appelle
`ChallengeResponseAuthentication`.

`PermitRootLogin no` suppose qu'un compte avec `sudo` existe (section 4.1).
Si tu dois garder un accès root direct, utilise plutôt
`PermitRootLogin prohibit-password` : root ne peut alors se connecter que par
clé.

:::caution[Piège classique]
Pour la plupart de ces options, `sshd` retient la **première** valeur lue, et
les fichiers `.conf` sont lus par ordre alphabétique. Une image cloud qui pose
`/etc/ssh/sshd_config.d/50-cloud-init.conf` avec `PasswordAuthentication yes`
gagnera contre un fichier `99-…`. Nomme donc ton fichier `00-…`, ou corrige le
fichier cloud-init, puis vérifie la valeur réellement appliquée (ci-dessous).
:::

### 6.2 Appliquer sans se verrouiller dehors

Avant toute chose : **garde la session SSH courante ouverte** et sache
comment ouvrir une console de secours chez le fournisseur. Une session
existante n'est pas coupée par un rechargement de `sshd`.

```bash
sudo sshd -t                 # teste la syntaxe : aucune sortie = OK
sudo systemctl reload ssh    # Debian, Ubuntu
# sudo systemctl reload sshd # Fedora, RHEL, Arch
```

Vérifie la configuration **effective**, pas seulement le fichier :

```bash
sudo sshd -T | grep -Ei \
  '^(passwordauthentication|kbdinteractiveauthentication|permitrootlogin|pubkeyauthentication)'
```

Attendu :

```
pubkeyauthentication yes
passwordauthentication no
kbdinteractiveauthentication no
permitrootlogin no
```

Puis, depuis une **nouvelle** session, teste une connexion par clé. Si elle
échoue, remets `PasswordAuthentication yes`, recharge, et cherche la cause
(section 11) — la session ouverte te sauve.

### 6.3 Pare-feu et groupe de sécurité

```bash
# ufw (Debian, Ubuntu)
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status verbose

# firewalld (Fedora, RHEL)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

Pense aussi au pare-feu **du fournisseur** (groupe de sécurité AWS, pare-feu
OVH/Hetzner, etc.) : un `ssh` qui reste muet jusqu'au timeout vient très
souvent de là, pas de `sshd`.

### 6.4 Options utiles, sans être indispensables

```conf
AllowUsers alice
MaxAuthTries 3
LoginGraceTime 20
```

- `AllowUsers` limite les comptes autorisés à se connecter.
- `MaxAuthTries` coupe après quelques essais.
- Changer le port (par exemple 2222) réduit le bruit des scanners, mais **ne
  remplace pas** l'authentification par clé : ce n'est pas une mesure de
  sécurité en soi. Si tu le fais, pense à `Port 2222`, au pare-feu, et à
  `ssh -p 2222`.

`fail2ban` peut encore réduire le bruit, mais avec
`PasswordAuthentication no` il n'a plus grand-chose à protéger.

---

## 7. Confort : `~/.ssh/config`

Plutôt que de retenir IP, utilisateur et chemin de clé, déclare un alias sur
le poste :

```conf
# ~/.ssh/config
Host vps
    HostName 203.0.113.10
    User alice
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    AddKeysToAgent yes
    ServerAliveInterval 60
```

```bash
chmod 600 ~/.ssh/config
```

Ensuite :

```bash
ssh vps
scp fichier.tar.gz vps:/tmp/
rsync -av ./site/ vps:/var/www/site/
```

| Option | Effet |
| --- | --- |
| `IdentitiesOnly yes` | n'essaie que la clé indiquée, pas toutes celles de l'agent (évite `Too many authentication failures`) |
| `AddKeysToAgent yes` | ajoute la clé à l'agent à la première utilisation |
| `ServerAliveInterval 60` | envoie un keepalive toutes les 60 s, évite les coupures de NAT |

Pour rebondir par le VPS vers une machine interne :

```conf
Host interne
    HostName 10.0.0.5
    User alice
    ProxyJump vps
```

---

## 8. GitHub

### 8.1 Une clé dédiée (recommandé)

```bash
ssh-keygen -t ed25519 -a 100 -C "github-alice-2026-11" \
           -f ~/.ssh/id_ed25519_github
```

Une clé par usage (VPS, GitHub, GitLab) : si l'une fuite, on la révoque sans
casser les autres. Ce n'est pas obligatoire, mais c'est la différence entre
une rotation de dix minutes et une journée de reconfiguration.

### 8.2 Déposer la clé publique

1. Copie le contenu de `~/.ssh/id_ed25519_github.pub` (une ligne) :
   `cat ~/.ssh/id_ed25519_github.pub`
2. GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**.
3. **Title** : `portable-alice-2026-11`.
4. **Key type** : `Authentication Key` (ou `Signing Key` si tu signes aussi
   tes commits — la même clé peut être ajoutée deux fois, une fois par type).
5. Colle la clé, puis **Add SSH key**.

GitHub ne demande jamais la clé privée. Si un site la demande, c'est une
attaque.

### 8.3 Tester

```bash
ssh -T -i ~/.ssh/id_ed25519_github git@github.com
# Hi alice! You've successfully authenticated, but GitHub does not provide shell access.
```

Le code de sortie est **1** : c'est normal, GitHub n'offre pas de shell. Le
message d'accueil, lui, prouve que la clé est reconnue. Le `-i` n'est utile que
tant que la clé n'est pas déclarée dans `~/.ssh/config` (section 8.4).

### 8.4 Configurer et cloner

```conf
# ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
```

```bash
git clone git@github.com:alice/mon-depot.git

# dépôt existant cloné en HTTPS : basculer l'URL
git remote set-url origin git@github.com:alice/mon-depot.git
```

Une URL `git@github.com:…` est du SSH ; une URL `https://github.com/…`
demande un jeton, pas une clé SSH. Si `git clone` réclame un mot de passe
pour une URL `git@…`, la clé n'a pas été acceptée.

### 8.5 Vérifier l'hôte

Empreinte Ed25519 publiée par GitHub :

```
SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU
```

Pour obtenir l'empreinte de l'hôte sous forme SHA256 et la comparer à cette
liste publiée :

```bash
ssh-keyscan -t ed25519 github.com 2>/dev/null | ssh-keygen -lf -
```

Liste officielle et à jour :
<https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints>

### 8.6 Si le port 22 est bloqué

Certains réseaux (hôtels, campus, entreprises) filtrent le 22. GitHub accepte
SSH sur le port 443 via `ssh.github.com` :

```conf
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519_github
```

Test : `ssh -T -p 443 git@ssh.github.com`.

### 8.7 Clé de déploiement (deploy key)

Pour un serveur qui doit seulement tirer un dépôt, sans compte GitHub :

- dépôt → **Settings** → **Deploy keys** → **Add deploy key** ;
- en lecture seule par défaut ; cocher **Allow write access** seulement si le
  serveur doit pousser ;
- une clé de déploiement ne peut servir que pour **un seul dépôt** chez
  GitHub (la réutiliser sur un second dépôt est refusé).

### 8.8 Organisation avec SSO

Si l'organisation utilise SAML SSO, la clé doit en plus être **autorisée**
pour cette organisation (bouton **Configure SSO** à côté de la clé). Sans
cela, `git clone` échoue en `Permission denied` alors que la clé est valide.

---

## 9. GitLab

### 9.1 Générer et déposer

```bash
ssh-keygen -t ed25519 -a 100 -C "gitlab-alice-2026-11" \
           -f ~/.ssh/id_ed25519_gitlab
cat ~/.ssh/id_ed25519_gitlab.pub
```

Dans GitLab : avatar → **Edit profile** → **Access** → **SSH keys** →
**Add new key**.

| Champ | Valeur |
| --- | --- |
| **Key** | la ligne `ssh-ed25519 …` complète |
| **Title** | `portable-alice-2026-11` |
| **Usage type** | `Authentication & Signing` (ou `Authentication` seul) |
| **Expiration date** | facultatif ; utile pour une clé de machine |

Une clé publique ne peut appartenir qu'à **un seul compte** GitLab ; GitLab
refuse aussi les clés compromises connues.

### 9.2 Tester

```bash
ssh -T -i ~/.ssh/id_ed25519_gitlab git@gitlab.com
# Welcome to GitLab, @alice!
```

GitLab auto-hébergé : remplace `gitlab.com` par ton domaine, par exemple
`ssh -T git@gitlab.example.com`. Le compte `git` est le compte de service
utilisé par Git sur SSH ; ce n'est pas ton compte GitLab.

### 9.3 Configurer et cloner

```conf
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
    IdentitiesOnly yes
```

```bash
git clone git@gitlab.com:alice/mon-projet.git
```

Empreintes des clés d'hôte de GitLab.com :
<https://docs.gitlab.com/user/gitlab_com/#ssh-host-keys-fingerprints>

### 9.4 Si le port 22 est bloqué

GitLab expose aussi un accès SSH sur 443, via `altssh.gitlab.com` :

```conf
Host gitlab.com
    HostName altssh.gitlab.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519_gitlab
```

Test : `ssh -T -p 443 git@altssh.gitlab.com`.

### 9.5 Clé de déploiement

Projet → **Settings** → **Repository** → **Deploy keys**. Une même clé de
déploiement peut être **activée dans plusieurs projets** (contrairement à
GitHub), avec ou sans droit d'écriture. C'est la bonne solution pour un
serveur de build qui lit plusieurs dépôts.

---

## 10. Plusieurs clés, plusieurs comptes

Quand l'agent contient plusieurs clés, SSH les propose dans l'ordre et le
serveur peut couper après quelques essais
(`Too many authentication failures`). La solution est un alias par compte,
avec `IdentitiesOnly` :

```conf
# ~/.ssh/config
Host github-perso
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_perso
    IdentitiesOnly yes

Host github-pro
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_pro
    IdentitiesOnly yes
```

Le nom de l'alias se met dans l'URL du dépôt :

```bash
git clone git@github-pro:entreprise/mon-depot.git
git remote set-url origin git@github-perso:alice/mon-depot.git
```

Ne place pas d'`IdentityFile` hors d'un bloc `Host` si tu utilises
`IdentitiesOnly` : la clé risque de ne pas être proposée. Pour forcer une clé
sur un seul dépôt, sans toucher à la configuration globale :

```bash
git config core.sshCommand \
  "ssh -o IdentitiesOnly=yes -i ~/.ssh/id_ed25519_github_pro -F /dev/null"
```

(`-F /dev/null` ignore `~/.ssh/config` pour cette commande ; `known_hosts`
reste utilisé.)

---

## 11. Dépannage

D'abord, regarder ce qui se passe réellement :

```bash
ssh -vvv -i ~/.ssh/id_ed25519 alice@203.0.113.10 2>&1 \
  | grep -Ei 'offering|identity file|authentications that can continue|denied|signature'
```

Les lignes `Offering public key: … SHA256:…` disent quelle clé est proposée ;
si la clé attendue n'apparaît pas, le problème est local (chemin, agent,
permissions). Si elle apparaît puis que le serveur refuse, le problème est
côté serveur (`authorized_keys`, permissions, `sshd_config`).

| Symptôme | Cause probable | Correctif |
| --- | --- | --- |
| `Permission denied (publickey)` | clé absente de `authorized_keys`, mauvais compte, mauvaise clé proposée | vérifier `ssh -vvv`, `cat ~/.ssh/authorized_keys` côté serveur, `IdentitiesOnly` + `-i` |
| `WARNING: UNPROTECTED PRIVATE KEY FILE!` | permissions trop ouvertes sur la clé privée | `chmod 600 ~/.ssh/id_ed25519` |
| La clé est sur le serveur mais ignorée | `~` ou `~/.ssh` inscriptible par le groupe/les autres, ou mauvais contexte SELinux | `chmod g-w,o-w ~`, `chmod 700 ~/.ssh`, `chmod 600 ~/.ssh/authorized_keys`, `restorecon -R ~/.ssh` |
| `Host key verification failed` | l'empreinte du serveur a changé (réinstallation, changement d'IP) | vérifier via la console, puis `ssh-keygen -R 203.0.113.10` |
| `Too many authentication failures` | l'agent propose trop de clés | `IdentitiesOnly yes` dans le bloc `Host`, ou `ssh-add -D` |
| `sign_and_send_pubkey: signing failed … agent refused` | clé absente de l'agent après redémarrage | `eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519` |
| `git clone` demande un mot de passe sur une URL `git@…` | clé non acceptée, ou URL HTTPS | tester `ssh -T`, corriger l'URL |
| `Connection timed out` | pare-feu local, fournisseur, ou port 22 filtré | tester `nc -vz 203.0.113.10 22`, ouvrir le port, essayer le 443 (GitHub/GitLab) |
| `no matching host key type found … ssh-rsa` | client récent face à un serveur ancien | mettre à jour le serveur ; à défaut, `HostKeyAlgorithms +ssh-rsa` (correctif temporaire) |
| `Load key … invalid format` | outil ancien face à une clé au format OpenSSH récent | convertir une **copie** : `ssh-keygen -p -m PEM -f copie_de_cle` |
| `Key already in use` (GitHub) | clé déjà utilisée comme deploy key sur un autre dépôt | créer une clé dédiée par dépôt |

Côté serveur, les journaux disent pourquoi une clé est refusée :

```bash
sudo journalctl -u ssh -n 50 --no-pager     # Debian, Ubuntu
sudo journalctl -u sshd -n 50 --no-pager    # Fedora, RHEL, Arch
sudo tail -n 50 /var/log/auth.log           # si rsyslog est utilisé
```

Et la configuration effective se lit avec `sudo sshd -T`.

---

## 12. Rotation, révocation, sauvegarde

### 12.1 Révoquer une clé

| Contexte | Action |
| --- | --- |
| VPS | supprimer la ligne correspondante dans `~/.ssh/authorized_keys` (chaque clé = une ligne) |
| GitHub | Settings → SSH and GPG keys → **Delete** |
| GitLab | Edit profile → Access → SSH keys → **Revoke** (ou **Remove**) |
| Deploy key | la retirer du dépôt ou du projet |

Révoquer côté forge est immédiat et suffit : la clé privée devient inutile
même si elle a fuité. En revanche, `ssh-keygen -R hôte` ne révoque **rien** :
cette commande efface seulement l'empreinte de l'hôte dans `known_hosts`.

### 12.2 Faire tourner une clé

1. générer une nouvelle paire avec un nom daté (`id_ed25519_2027-05`) ;
2. déposer la nouvelle clé publique partout où l'ancienne est autorisée ;
3. tester chaque accès ;
4. supprimer l'ancienne clé des `authorized_keys` et des forges ;
5. effacer l'ancienne clé privée du poste.

L'ordre compte : on ajoute la nouvelle **avant** de retirer l'ancienne, sinon
on se coupe l'accès.

### 12.3 Passphrase oubliée ou à changer

```bash
ssh-keygen -p -f ~/.ssh/id_ed25519
```

La passphrase ne se « récupère » pas : sans elle, la clé privée est
inutilisable. C'est le prix de la protection — et la raison pour laquelle on
garde une sauvegarde chiffrée.

### 12.4 Sauvegarde

Sauvegarde la clé privée **chiffrée** (par exemple dans un gestionnaire de
mots de passe, ou une archive chiffrée), jamais en clair sur un cloud ou une
clé USB non chiffrée. La clé publique, elle, se régénère à partir de la
privée :

```bash
ssh-keygen -y -f ~/.ssh/id_ed25519 > ~/.ssh/id_ed25519.pub
```

Mieux encore : ne sauvegarde rien et génère une clé par machine. Une clé
perdue se remplace en deux minutes ; une clé partagée entre cinq machines ne
se révoque proprement qu'en cinq étapes.

### 12.5 Signer ses commits avec la même clé (facultatif)

GitHub comme GitLab savent vérifier une signature SSH :

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

Côté forge, la clé doit être autorisée pour la **signature** : chez GitHub,
ajoute-la une seconde fois avec le type `Signing Key` ; chez GitLab, choisis
le type d'usage `Signing` ou `Authentication & Signing`.

---

## 13. Checklist finale

- [ ] paire Ed25519 créée, avec passphrase
- [ ] clé publique dans `~/.ssh/authorized_keys` du VPS
- [ ] permissions : `~` non inscriptible par les autres, `~/.ssh` en 700,
      `authorized_keys` en 600, clé privée en 600
- [ ] première connexion testée, empreinte de l'hôte vérifiée
- [ ] connexion testée dans une **seconde** session avant de couper le mot de
      passe
- [ ] `PasswordAuthentication no` appliqué et vérifié avec `sshd -T`
- [ ] pare-feu du VPS **et** groupe de sécurité du fournisseur ouverts sur le
      port SSH
- [ ] clé publique GitHub déposée, `ssh -T git@github.com` répond
- [ ] clé publique GitLab déposée, `ssh -T git@gitlab.com` répond
- [ ] `~/.ssh/config` avec un alias par hôte et `IdentitiesOnly yes`
- [ ] sauvegarde chiffrée de la clé privée (ou décision assumée de ne pas en
      avoir)

---

## Sources

- OpenSSH, `ssh-keygen(1)` : <https://man.openbsd.org/ssh-keygen>
- OpenSSH, `ssh_config(5)` : <https://man.openbsd.org/ssh_config>
- OpenSSH, `sshd_config(5)` : <https://man.openbsd.org/sshd_config>
- GitHub — générer une clé SSH et l'ajouter à l'agent :
  <https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent>
- GitHub — ajouter une clé à un compte :
  <https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account>
- GitHub — SSH sur le port 443 :
  <https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port>
- GitHub — empreintes des clés d'hôte :
  <https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints>
- GitLab — utiliser des clés SSH :
  <https://docs.gitlab.com/user/ssh/>
- GitLab — configuration avancée (comptes multiples, clés par dépôt) :
  <https://docs.gitlab.com/user/ssh_advanced/>
- Debian — contenu du paquet `openssh-client` :
  <https://packages.debian.org/trixie/openssh-client>
- Fedora — paquet `openssh-clients` :
  <https://packages.fedoraproject.org/pkgs/openssh/openssh-clients/>
- GitLab — port SSH alternatif et empreintes de GitLab.com :
  <https://docs.gitlab.com/user/gitlab_com/#alternative-ssh-port>

*Guide vérifié avec OpenSSH 10.0p2 (Debian 13), novembre 2026. Les interfaces
web de GitHub et GitLab changent plus vite que les commandes : en cas de
doute, les liens ci-dessus font foi.*
