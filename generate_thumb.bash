#!/bin/bash

rm -f source/images/galery/other/thumb/*
rm -f source/images/galery/t_bien_roule/thumb/*
rm -f source/images/galery/jeans/thumb/*
rm -f source/images/galery/queen/thumb/*

mogrify -path source/images/galery/other/thumb/ -resize 250x -quality 94 -verbose -format jpg source/images/galery/other/full/*.jpg
mogrify -path source/images/galery/t_bien_roule/thumb/ -resize 250x -quality 94 -verbose -format jpg source/images/galery/t_bien_roule/full/*.jpg
mogrify -path source/images/galery/jeans/thumb/ -resize 250x -quality 94 -verbose -format jpg source/images/galery/jeans/full/*.jpg
mogrify -path source/images/galery/queen/thumb/ -resize 250x -quality 94 -verbose -format jpg source/images/galery/queen/full/*.jpg
