#!/bin/bash

yarn build

cp -r ./public/images ./public/dist/images

cd ./public/dist

grep -rli '/images/' * | xargs -i@ sed -i 's/\/images\//\.\/images\//g' @
grep -rli '.css"' * | xargs -i@ sed -i 's/\.css\"/\.css?v=66\"/g' @
grep -rli '.js"' * | xargs -i@ sed -i 's/\.js\"/\.js?v=66\"/g' @

git init
git add --all
git commit -m "build"
git branch -M dist
git remote add origin git@github.com:user/repo.git
git push -u origin dist --force
