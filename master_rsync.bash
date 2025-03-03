#!/bin/bash

rsync -rv -e ssh --delete-after /home/jm/work/classy-x-middleman/build/ jm@192.168.3.170:/var/www/html/classy-x.com


