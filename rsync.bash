#!/bin/bash

rsync -rv -e ssh --delete-after /var/www/html/classy_x_v2/build/ jm@192.168.1.150:/var/www/html/classy_x.com


