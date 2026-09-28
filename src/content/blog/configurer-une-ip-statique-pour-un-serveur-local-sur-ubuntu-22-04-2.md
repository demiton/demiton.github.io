---
title: Configurer une IP statique pour un serveur local sur Ubuntu 22.04.2
description: "Donner une adresse IP fixe à un serveur local sous Ubuntu 22.04 en modifiant la configuration netplan."
date: 2023-03-05
category: Divers
tags: [réseau, linux, ubuntu, serveur]
cover: /covers/configurer-une-ip-statique-pour-un-serveur-local-sur-ubuntu-22-04-2.svg
draft: false
---

Pour savoir sur quel port vous etes connecté

```
ip a
```

retourne dans mon cas :

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp1s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 00:e0:1a:48:2a:0f brd ff:ff:ff:ff:ff:ff
3: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:e0:1a:48:2a:10 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.15/24 metric 100 brd 192.168.1.255 scope global dynamic enp3s0
       valid_lft 35018sec preferred_lft 35018sec
    inet6 2a01:e34:ec4a:8d90:2e0:1aff:fe48:2a10/64 scope global dynamic mngtmpaddr noprefixroute 
       valid_lft 86332sec preferred_lft 86332sec
    inet6 fe80::2e0:1aff:fe48:2a10/64 scope link 
       valid_lft forever preferred_lft forever
4: wlp2s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 00:15:00:65:03:f5 brd ff:ff:ff:ff:ff:ff
```

Nous allons modifier le fichier de configuration réseau

```
sudo vim /etc/netplan/00-installer-config.yaml
```

tel que :

```
network:
  ethernets:
    enp1s0:
      dhcp4: true
    enp3s0:
      dhcp4: true
      addresses: [192.168.1.175/24]
      nameservers:
        addresses: [8.8.8.8,8.8.4.4,192.168.1.1]
  version: 2
```

Enfin nous appliquons la config :

```
sudo netplan apply
```
