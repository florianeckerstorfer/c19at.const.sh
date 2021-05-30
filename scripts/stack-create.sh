#!/bin/bash

CONFIG=$(cat config.json)
STACK_NAME=$(echo $CONFIG | jq -r .stackName)
SITE_NAME=$(echo $CONFIG | jq -r .siteName)
DOMAIN_NAME=$(echo $CONFIG | jq -r .domainName)
CERTIFICATE_ARN=$(echo $CONFIG | jq -r .certificateArn)

mkdir -p build

./scripts/lambda-pack.sh

aws cloudformation package \
  --template-file cloudformation/stack.template.yml \
  --output-template-file build/stack.yml \
  --s3-bucket fec-lambda-code-repo \
  --profile fec
  
aws cloudformation create-stack \
  --stack-name $STACK_NAME \
  --template-body file://build/stack.yml \
  --region us-east-1 \
  --capabilities CAPABILITY_NAMED_IAM \
  --profile fec \
  --parameters ParameterKey=AcmCertificateArn,ParameterValue=$CERTIFICATE_ARN \
    ParameterKey=DomainName,ParameterValue=$DOMAIN_NAME \
    ParameterKey=SiteName,ParameterValue=$SITE_NAME
    