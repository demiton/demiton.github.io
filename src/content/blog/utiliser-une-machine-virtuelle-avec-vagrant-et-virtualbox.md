---
title: Utiliser une machine virtuelle avec Vagrant et VirtualBox
description: "Installer et administrer des machines virtuelles VirtualBox en quelques commandes grâce à Vagrant."
date: 2018-09-20
category: DevOps
tags: [vagrant, virtualbox, vm]
cover: /covers/utiliser-une-machine-virtuelle-avec-vagrant-et-virtualbox.svg
draft: false
---

## Vagrant : Installer et administrer une machine virtuelle en quelques commandes

Vagrant permet d’installer plusieurs types de machines virtuelles ( VMWare, virtualbox, docker..) mais aussi des simples serveurs de base de données sans avoir à passer par l’installation parfois fastidieuse de ces sytemes. Nous allons nous concentrer sur les méthodes associé à VM de type virtualbox surlaquelle nous installerons la dernière version de debian, debian 9.  
Vagrant met à disposition un cloud permettant de récupérer une multitude de distribution :

-   [https://app.vagrantup.com](https://app.vagrantup.com)

### Préalables

1.  Disposer de la dernière version de Vagrant et de virtualbox
2.  Activer la virtualisation de votre pc ( dans mon cas, Lenovo VT-X), accessible dans le bios de votre appareil.

## Lancement de la machine virtuelle

Pour lancer la distribution debian,il faudra tout d’abort créer le répertoire où sera placer la VDI .Seules deux commandes sont alors necessaires pour installer la vdi, Vagrant s’occupe de tout.  
Nous ferons :

```
mkdir -p vagrant/linux/debian9 && cd vagrant/linux/debian9
## chargement de la configuration
vagrant init debian/stretch64
## lancement de la vm
vagrant up
```

## Ajouter un plugin Vagrant

### Installer les “Guest Additions” de virtual box

Grace au plugin [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest), installer les “Guest Additions” devient un jeu d’enfant :

```
vagrant plugin install vagrant-vbguest
```

Pour s’assurer que le plugin est bien installé on tapera :

```
vagrant vbguest --status
[default] GuestAdditions 5.2.16 running --- OK.
```

## Commandes de controle

### Mettre en pause la machine virtuelle (Conserve l’état de la machine)

```
vagrant suspend
```

### Eteindre la machine virtuelle

```
vagrant halt
```

### Cloner la vagrant virtualBox

```
vagrant package
```

### Utilisateur et mot de passe pour accéder à sa VM via l’interface graphique de VirtualBox

Par défaut, l’utilsateur root sera :

```
login : vagrant
password : vagrant
```

### Accéder à sa machine virtuelle en ssh via le terminal

Dans le dossier associé à la VM, taper :

```
vagrant ssh
```

### Démarrer un machine virtuelle virtualbox avec une interface graphique

En se connectant à la vm debian avec virtualbox, on se rend compte qu’il n’y a pas d’interface graphique. Nous souhaitons alors pouvoir y accéder de manière graphique comme n’importe OS. Il faut pour cela que le système d’exploitation dispose d’un environnement de bureau , “desktop environment” comme `GNOME`, `XFCE`, `KDE`..

### Lancer automatiquement la VM avec virtualbox

Nous devrons dans ce cas, le Vagrantfile en dé-commentant les lignes :

```
 config.vm.provider "virtualbox" do |vb|
 # Display the VirtualBox GUI when booting the machine
 vb.gui = true
 #
 #   # Customize the amount of memory on the VM:
 vb.memory = "1024"
 end
```

Virtualbox se lancera automatiquement lorsque l’on tapera `vagrant up` dans le dossier ou se situe le `Vagrantfile`

## Obtenir un environment de bureau pour sa machine virtuelle installée avec Vagrant

La plupart des distributions que l’on trouve sur le cloud vagrant ne possèdent pas par defaut d’interface graphique. Il faudra en installer une. Dans notre cas, nous avons installé une distribution Debian Jessie avec :

```
vagrant init debian/jessie64
```

## Créer une vagrant Box personnalisée

Il va falloir tout d’abord désactiver la clef ssh par défaut de la vagrant Box que l’on veut packager. On risque sinon d’avoir une erreur d’authentication lors du rapatriement de la box:  
`default: Warning: Authentication failure. Retrying...` . Voir l’issue : [https://github.com/hashicorp/vagrant/issues/5186](https://github.com/hashicorp/vagrant/issues/5186)

1.  Dans le VagranFile, on ajoute : `config.ssh.insert_key = false`
2.  On ajouter la clef publique présente à l’adresse : [https://github.com/hashicorp/vagrant/blob/master/keys/vagrant.pub](https://github.com/hashicorp/vagrant/blob/master/keys/vagrant.pub) dans le fichier des clefs autorisées de sa vm : `~vagrant/.ssh/authorized_keys` accessible avec la commande `vagrant ssh`
3.  on peut enfin packager sa vm :
    
    ```
    vagrant package --output maVM.box
    ```
    

### Erreurs potentielles

Avec Fedora 28, l’installation classique ne marche pas ( jusqu’a présent). Il y a un décalage de version ruby qui aboutit à des erreurs lorsque l’on tape :

```
vagrant init ubuntu/xenial64
```

on obtient :

```
 vagrant init ubuntu/xenial64
 Ignoring ffi-1.9.23 because its extensions are not built. Try: gem pristine ffi --version 1.9.23
 Ignoring unf_ext-0.0.7.5 because its extensions are not built. Try: gem pristine unf_ext --version 0.0.7.5
 /usr/share/gems/gems/openssl-2.1.0/lib/openssl/ssl.rb:20:in `<class:SSLContext>': uninitialized constant OpenSSL::SSL::TLS1_VERSION (NameError)
     from /usr/share/gems/gems/openssl-2.1.0/lib/openssl/ssl.rb:18:in `<module:SSL>'
     from /usr/share/gems/gems/openssl-2.1.0/lib/openssl/ssl.rb:17:in `<module:OpenSSL>'
     from /usr/share/gems/gems/openssl-2.1.0/lib/openssl/ssl.rb:16:in `<top (required)>'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /usr/share/gems/gems/openssl-2.1.0/lib/openssl.rb:21:in `<top (required)>'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /usr/share/vagrant/gems/gems/vagrant-2.0.2/lib/vagrant.rb:66:in `<top (required)>'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /home/demiton/.rvm/rubies/ruby-2.4.4/lib/ruby/site_ruby/2.4.0/rubygems/core_ext/kernel_require.rb:59:in `require'
     from /usr/share/vagrant/gems/gems/vagrant-2.0.2/bin/vagrant:75:in `<top (required)>'
     from /usr/share/vagrant/gems/bin/vagrant:23:in `load'
     from /usr/share/vagrant/gems/bin/vagrant:23:in `<main>'
```

Quelle est ma version de Ruby ?

```
[demiton@localhost ubuntu18.04]$ ruby -v
ruby 2.4.4p296 (2018-03-28 revision 63013) [x86_64-linux]
```

Quelle est ma version de Vagrant ?

```
vagrant -v
Ignoring ffi-1.9.23 because its extensions are not built. Try: gem pristine ffi --version 1.9.23
Ignoring unf_ext-0.0.7.5 because its extensions are not built. Try: gem pristine unf_ext --version 0.0.7.5
Vagrant 2.0.2
```

Le message d’erreur m’indique que l’installation de Vagrant ne semble pas s’etre réalisée correctement, indépendemment de l’appel `vagrant init`  
Apparement la commande :

```
sudo dnf install  vagrant
```

ne marche pas. Le dépot actuel de fedora n’est peut etre pas à jour.  
Nous allons télécharger la dernière version de Vagrant :  
[https://releases.hashicorp.com/vagrant/](https://releases.hashicorp.com/vagrant/){:target=”_blank”}

Dans notre cas, pour installer le paquet sur Fedora 28, on fera :

```
wget https://releases.hashicorp.com/vagrant/2.1.5/vagrant_2.1.5_x86_64.rpm && \
sudo dnf install -y ./vagrant*.rpm && \
rm vagrant_*.rpm*
```

Magnifique , vagrant fonctionne bien désormais!

## Notes d’utilisation de Virtual Box

### Redimension un disque virtuel vmdk

A priori , il est impossible de redimensionner un disque virtuel au format vmdk.  
Mais il existe une solution, c’est de cloner son disque vmdk en vdi, le format vdi offrant l’allocation dynamique de mémoire ( [voir](https://stackoverflow.com/questions/11659005/how-to-resize-a-virtualbox-vmdk-file){:target=”_blank”} ) .

Afin de cloner le disque nous passerons par l’utilitaire `VBoxManage`. Via le terminal sous windows 10, on pourra se rendre dans le dossier VirtualBox présent sur son pc. Pour mon pc a l’adresse : `c:\Program Files\Oracle\VirtualBox`, on tapera :

```
VBoxManage clonehd "mondisque.vmdk" "mondisque.vdi" --format vdi
```

### Redimensionner un disque virtuel vdi

```
VBoxManage modifyhd "mondisque.vdi" --resize 51200
```

Remarque : l’espace libre n’est pas affecté directement a la partition existance, mais devient une partition en tant que tel. Pour fusionner la nouvelle partition et la partition systeme existente , on pourra utiliser Gparted. Mais il est alors impossible de redimensionner une partition systeme en cours d’utilisation car il faut qu’elle ne soit pas montée. On prendra le soin donc de modifier le disque vdi via un autre systeme, tel qu’il soit reconnu comme un disque secondaire et non “systeme”.

### Connaitre la liste de ses disques virtuel

```
 VBoxManage.exe list hdds
```
