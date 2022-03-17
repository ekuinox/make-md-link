#!/bin/sh

mkdir -p ./out
echo "javascript:" `cat ./dist/bookmarklet.js` > ./dist/bookmarklet
