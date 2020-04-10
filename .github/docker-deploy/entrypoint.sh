#!/bin/sh -l

yarn deps

time=$(date)
echo "::set-output name=time::$time"