#!/bin/bash

# Prepare Lambda dependencies.
mkdir -p layers/libNodeModules/nodejs
cp package*.json layers/libNodeModules/nodejs
pushd layers/libNodeModules/nodejs/

npm i --only=prod

# If AWS SDK is needed, uncomment this to exclude it from the layer, as it's already part of the Lambda runtime.
# find ./layers/libNodeModules/nodejs/node_modules/ -type d -name "aws-sdk" -exec rm -rf {} +

popd
