#!/bin/bash

mount images_galery

for i in other t_bien_roule queen jeans
do
  rm -f source/images/galery/$i/full/*
  cp -v images_galery/$i/* source/images/galery/$i/full/ 

  for f in $(ls source/images/galery/$i/full/*.j*)
  do
    filename=$(basename -- "$f")
    filename="${filename%.*}"

    if [ ! -f source/images/galery/$i/full/$filename.txt ]; then

      echo "name:" > source/images/galery/$i/full/$filename.txt
      echo "modele:" >> source/images/galery/$i/full/$filename.txt
      echo "photographer:" >> source/images/galery/$i/full/$filename.txt
    fi
  done

  rm -f source/images/galery/$i/thumb/*
  rm -f source/images/galery/$i/big/*

  mogrify -path source/images/galery/$i/big/ -resize "1600x1200>" -strip -verbose -format jpg source/images/galery/$i/full/*.jpg
  mogrify -path source/images/galery/$i/thumb/ -resize 250x -quality 94 -strip -verbose -format jpg source/images/galery/$i/full/*.jpg
done

umount images_galery
