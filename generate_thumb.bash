#!/bin/bash

rm -f source/images/galery/thumb/*
mogrify -path source/images/galery/thumb/ -resize 250x -quality 94 -verbose -format jpg source/images/galery/full/*.jpg
