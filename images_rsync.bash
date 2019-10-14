#!/bin/bash

rsync -rv -e ssh --chmod=Du=rwx,Dgo=rx,Fu=rw,Fog=rw --delete-after /var/www/html/classy_x_v2/source/images/jeans/jeans/full admin@192.168.1.103:/share/work/classy_x_images/jeans
rsync -rv -e ssh --chmod=Du=rwx,Dgo=rx,Fu=rw,Fog=rw --delete-after /var/www/html/classy_x_v2/source/images/other/jeans/full admin@192.168.1.103:/share/work/classy_x_images/other
rsync -rv -e ssh --chmod=Du=rwx,Dgo=rx,Fu=rw,Fog=rw --delete-after /var/www/html/classy_x_v2/source/images/queen/jeans/full admin@192.168.1.103:/share/work/classy_x_images/queen
rsync -rv -e ssh --chmod=Du=rwx,Dgo=rx,Fu=rw,Fog=rw --delete-after /var/www/html/classy_x_v2/source/images/t_bien_roule/jeans/full admin@192.168.1.103:/share/work/classy_x_images/t_bien_roule

