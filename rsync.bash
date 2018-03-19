#!/bin/bash

rsync -rv -e ssh --delete-after /var/www/html/classy_x_v2/build/ admin@192.168.1.103:/share/Web/classy_x.com


