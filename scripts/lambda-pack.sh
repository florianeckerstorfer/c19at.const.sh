#!/bin/bash

mkdir -p build
cd cloudformation/lambda
zip ../../build/lambda.zip *.js
cd ../..
