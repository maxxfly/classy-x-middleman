# classy_x

This is the classy_x.com website

Install
=======

`bundle install`

Prerequires
===========

- bundle
- nodejs

Build
=====

`make install`
`bundle exec middleman build`

Server
======

`bundle exec middle server`


use of generate_thumb.bash
==========================

Copier les images qu on souhaite rajouter pour les models dans le dossier *raw_images_galery*

dans le dossier `/raw_images_galery/users` , on cree les models sous la forme
```
/users/<PRENOM MODEL>.txt
```

et dedans on mets un fichier texte avec 2 lignes :
```
name: <NOM MODEL>
link: <LIEN VERS SON SITE INTERNET>
```

a cote de ca, on a un dossier par galerie: *jean*, *other*, *queen*, *t_bien_roule*
dans chaque dossier, on depose la photo dimension originale et un fichier texte avec le meme nom qui l accompagne
par exemple

23.jpg et 23.txt

et dedans on decrit la photo et le model

```
name: Exemple
modele: theo
photographer: Dee&Jee
```

La photo s appelle **Exemple**
En modele on va utiliser les informations dans /users/theo.txt car le fichier existe
En photographe, le fichier n existe pas, donc il utilisera le texte descript dans le fichier sans remplacement
