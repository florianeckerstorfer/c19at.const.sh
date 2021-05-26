#!/bin/bash

aws s3 sync dist/ s3://constshc19at-s3bucket-12o9e6sez9ycn --region "us-east-1" --profile c19at.const.sh
aws s3 sync dist/ s3://constshc19at-s3bucket-12o9e6sez9ycn --delete --region "us-east-1" --profile c19at.const.sh
