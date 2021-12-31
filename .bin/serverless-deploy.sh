#!/bin/bash

set -ue

echo Creating Lambda layer with node_modules ...
./.bin/prepare-layer.sh

echo Deploying to stage ${SERVERLESS_STAGE} ...
npx sls deploy --stage ${SERVERLESS_STAGE}
