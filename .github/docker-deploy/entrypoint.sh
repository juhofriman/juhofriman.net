#!/bin/sh -l

set -e

export AWS_REGION=eu-north-1

RUN apk add --no-cache \
        python3 \
        py3-pip \
    && pip3 install --upgrade pip \
    && pip3 install --no-cache-dir \
        awscli \
    && rm -rf /var/cache/apk/*

yarn install

cd cdk

yarn cdk deploy --require-approval never site-stack

cd ..

cd site

aws s3 cp index.html s3://personal-site-assets

time=$(date)
echo "::set-output name=time::$time"