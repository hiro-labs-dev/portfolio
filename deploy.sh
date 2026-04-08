#!/bin/bash

# Deploy script for hiro-labs.com
# Builds the site and deploys to S3 + CloudFront

set -e  # Exit on error

echo "🔨 Building site..."
npm run build

echo "📦 Syncing to S3..."
aws s3 sync dist/ s3://hiro-labs.dev/ --delete --region us-east-1

echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E2RUGLH1BBXOG --paths "/*" --region us-east-1

echo "✅ Deployment complete! Site will be live in 1-2 minutes."
echo "🌐 https://hiro-labs.com"
