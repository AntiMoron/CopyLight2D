#!/bin/bash
# called by native
THIS_DIR=$(dirname "$0")
rm -rf ./dist

pushd "$THIS_DIR"
npm run serve &
npm run dev:examples

popd