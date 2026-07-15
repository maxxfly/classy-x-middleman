#!/bin/bash

for i in other t_bien_roule queen jeans
do
  rm -fv source/images/users/*
  cp -v raw_images_galery/users/* source/images/users/

  rm -fv source/images/galery/$i/full/*.jpg
  rm -fv source/images/galery/$i/full/*.jpeg
  cp -v raw_images_galery/$i/* source/images/galery/$i/full/

  for f in $(ls source/images/galery/$i/full/*.j* 2>/dev/null)
  do
    filename=$(basename -- "$f")
    filename="${filename%.*}"

    if [ ! -f source/images/galery/$i/full/$filename.txt ]; then
      echo "name:" > source/images/galery/$i/full/$filename.txt
      echo "modele:" >> source/images/galery/$i/full/$filename.txt
      echo "photographer:" >> source/images/galery/$i/full/$filename.txt
    fi
  done

  rm -fv source/images/galery/$i/big/*
  rm -fv source/images/galery/$i/thumb/*

  for f in source/images/galery/$i/full/*.jpg
  do
    filename=$(basename -- "$f")
    filename="${filename%.*}"

    mogrify -path source/images/galery/$i/big/ -resize "1600x1200>" -strip -verbose -format jpg "$f"
    mogrify -path source/images/galery/$i/thumb/ -resize 250x -quality 94 -strip -verbose -format jpg "$f"
  done
done
