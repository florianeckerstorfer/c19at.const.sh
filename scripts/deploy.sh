#!/bin/bash

CONFIG=$(cat config.json)
REGION=$(echo $CONFIG | jq -r .region)
S3_BUCKET=$(echo $CONFIG | jq -r .s3Bucket)
DISTRIBUTION_ID=$(echo $CONFIG | jq -r .distributionId)

aws s3 sync dist/ s3://$S3_BUCKET --region $REGION --profile c19at.const.sh
aws s3 sync dist/ s3://$S3_BUCKET --delete --region $REGION --profile c19at.const.sh
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/index.html" --region $REGION --profile c19at.const.sh