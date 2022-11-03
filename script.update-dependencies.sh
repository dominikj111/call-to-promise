#!/bin/bash

CURRENT=$(git branch --show-current)
git stash

if [[ $CURRENT != 'master' ]]; then
    git checkout master
fi

git pull
git checkout -b feature/dependencies-update

npx --yes npm-check-updates -u
npm i

npm run build
npm run test

git add package*

if [[ $(git commit -m 'Update dev dependencies' | grep 'nothing to commit') == '' ]]; then
    echo "nothing to commit"
else
    git push --force origin feature/dependencies-update
fi

goo master
git pull

git branch -D feature/dependencies-update
git checkout $CURRENT
CURRENT=0
git stash pop
