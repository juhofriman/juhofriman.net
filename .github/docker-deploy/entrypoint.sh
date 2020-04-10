#!/bin/sh -l

set -e

apk add python py-pip
pip install awscli --upgrade --user
mv /root/.local/bin/* /usr/local/bin

yarn install

cd cdk

yarn cdk deploy --require-approval never

cd ..

cd site

aws s3 cp index.html s3://juhofriman-dot-net-bucket

time=$(date)
echo "::set-output name=time::$time"