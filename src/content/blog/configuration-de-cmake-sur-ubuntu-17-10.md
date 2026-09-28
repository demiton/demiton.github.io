---
title: Configuration de Cmake sur Ubuntu 17.10
description: "Installer CMake et les outils C/C++ sur Ubuntu, puis compiler un premier programme avec un fichier CMakeLists.txt."
date: 2018-02-02
category: Programmation
tags: [cmake, c++, ubuntu]
cover: /covers/configuration-de-cmake-sur-ubuntu-17-10.svg
draft: false
---

## Installations

1.  Installer les librairies c et C++
    
    ```
    sudo apt-get install build-essential
    ```
    
2.  Installer cmake
    
    ```
    sudo apt-get install cmake
    ```
    

## Première utilisation

Pour compiler un programe C++ avec cmake, on utilise un fichier `CMakeLists.txt` dans lequel on donne les indications pour la création du `Makefile`.

### Exemple :

Nous reprenons [l’exemple du site officiel](https://cmake.org/cmake-tutorial/){:target=”_blank”}

1.  Dans un dossier vide, créer deux fichiers :

`CMakeLists.txt` :

```
cmake_minimum_required (VERSION 2.6)
project (Tutorial)
add_executable(Tutorial tutorial.cxx)
```

`tutorial.cxx` :

```

//Un programme qui calcule la racine carrée
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
int main (int argc, char *argv[])
{
    if (argc < 2)
    {
        fprintf(stdout,"Usage: %s number\n",argv[0]);
        return 1;
    }
    double inputValue = atof(argv[1]);
    double outputValue = sqrt(inputValue);
    fprintf(stdout,"La racine carrée de %g est %g\n",
    inputValue, outputValue);
    return 0;
}
```

1.  A la racine du dossier, taper `cmake .` Cmake va alors créér le Makefile :

Vous devriez avoir quelque-chose comme :

```

-- The C compiler identification is GNU 7.2.0
-- The CXX compiler identification is GNU 7.2.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/demiton/git/exemples-Cpp/ubuntu17.10/cmake-exemple
```

1.  Le Makefile a été crée, il suffit alors de taper : `make` afin de compiler le projet :

```

demiton@X250:~/git/exemples-Cpp/ubuntu17.10/cmake-exemple$ ls
CMakeCache.txt  cmake_install.cmake  Makefile
CMakeFiles      CMakeLists.txt       tutorial.cxx
demiton@X250:~/git/exemples-Cpp/ubuntu17.10/cmake-exemple$ make
Scanning dependencies of target Tutorial
[ 50%] Building CXX object CMakeFiles/Tutorial.dir/tutorial.cxx.o
[100%] Linking CXX executable Tutorial
[100%] Built target Tutorial
demiton@X250:~/git/exemples-Cpp/ubuntu17.10/cmake-exemple$ ls
CMakeCache.txt  cmake_install.cmake  Makefile  tutorial.cxx
CMakeFiles      CMakeLists.txt       Tutorial
```

1.  Lancer le projet : `./Tutorial 36`
