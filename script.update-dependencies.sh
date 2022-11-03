#!/bin/bash

CURRENT=$(git branch --show-current)
git stash

if [[ $CURRENT != 'master' ]]; then
    git checkout master
fi

git pull

if [[ $(git branch | grep feature/dependencies-update) == '' ]]; then
    git checkout -b feature/dependencies-update
else
    git checkout feature/dependencies-update
fi

npx --yes npm-check-updates -u
npm i

npm run build
npm run test

git add package*

if [[ "$(echo $(git commit -m 'Update dev dependencies') | grep 'nothing to commit')" == "" ]]; then
    git push --force origin feature/dependencies-update
else
    echo "-----------------"
    echo "nothing to commit"
    echo "-----------------"
fi

git checkout master
git pull

git branch -D feature/dependencies-update
git checkout $CURRENT
CURRENT=0
git stash pop
