#!/bin/sh -l

yarn install

cd cdk

yarn cdk deploy --require-approval never

cd ..

time=$(date)
echo "::set-output name=time::$time"