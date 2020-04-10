#!/bin/sh -l

echo "Hello World"
time=$(date)
echo "::set-output name=time::$time"