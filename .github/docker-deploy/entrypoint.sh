#!/bin/sh -l

set -e

export AWS_REGION=eu-west-1

apk add python py-pip
pip install awscli --upgrade --user

yarn install

cd cdk

yarn cdk deploy --require-approval never site-stack

cd ..

cd site

aws s3 cp index.html s3://juhofriman-dot-net-bucket

time=$(date)
echo "::set-output name=time::$time"