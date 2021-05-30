#!/bin/bash

CONFIG=$(cat config.json)
STACK_NAME=$(echo $CONFIG | jq -r .stackName)
REGION=$(echo $CONFIG | jq -r .region)

FUNCTION_NAME=$(aws cloudformation list-stack-resources --stack-name $STACK_NAME --region us-east-1 --profile fec | jq -r '.StackResourceSummaries[] | select(.LogicalResourceId == "LambdaFunction").PhysicalResourceId')

DISTRIBUTION_ID=$(aws cloudformation list-stack-resources --stack-name $STACK_NAME --region us-east-1 --profile fec | jq -r '.StackResourceSummaries[] | select(.LogicalResourceId == "CloudFrontDistribution").PhysicalResourceId')

./scripts/lambda-pack.sh

aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://build/lambda.zip \
  --region us-east-1 \
  --profile fec
  
aws lambda publish-version \
  --function-name $FUNCTION_NAME \
  --region us-east-1 \
  --profile fec
  
readonly lambda_arn=$(
  aws lambda list-versions-by-function \
    --function-name "$FUNCTION_NAME" \
    --region "$REGION" \
    --query "max_by(Versions, &to_number(to_number(Version) || '0'))" \
    --profile fec | jq -r '.FunctionArn'
)

readonly tmp1=$(mktemp)
readonly tmp2=$(mktemp)

aws cloudfront get-distribution-config \
  --id "$DISTRIBUTION_ID" \
  --profile fec > "$tmp1"

readonly etag=$(jq -r '.ETag' < "$tmp1")

cat "$tmp1" | jq '(.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations.Items[] | select(.EventType=="origin-response") | .LambdaFunctionARN) |= "'"$lambda_arn"'"' | jq '.DistributionConfig' > "$tmp2"

# the dist config has to be in the file
# and be referred in specific way.
aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --distribution-config "file://$tmp2" \
  --if-match "$etag" \
  --profile fec

rm -f "$tmp1" "$tmp2"
  