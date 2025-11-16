# Deployment Guide

This guide covers deploying the AWS Network Game to various platforms.

## AWS S3 + CloudFront (Recommended)

This is the most cost-effective and performant option for hosting the game.

### Step 1: Build the Project

```bash
npm run build
```

This creates optimized static files in the `dist/` directory.

### Step 2: Create S3 Bucket

```bash
# Replace 'your-unique-bucket-name' with your desired bucket name
BUCKET_NAME="aws-network-game"

# Create bucket
aws s3 mb s3://$BUCKET_NAME --region us-east-1

# Enable versioning (optional but recommended)
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled
```

### Step 3: Upload Files

```bash
# Upload all files
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync dist/ s3://$BUCKET_NAME/ \
  --cache-control "public, max-age=3600" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json"
```

### Step 4: Create CloudFront Distribution

```bash
# Create a CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name $BUCKET_NAME.s3.amazonaws.com \
  --default-root-object index.html \
  --default-cache-behavior \
    "ViewerProtocolPolicy=redirect-to-https,AllowedMethods=GET,HEAD,OPTIONS,CachedMethods=GET,HEAD,Compress=true"
```

Or use this CloudFormation template:

```yaml
# cloudformation.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'AWS Network Game - S3 + CloudFront'

Resources:
  GameBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'aws-network-game-${AWS::AccountId}'
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false

  GameBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref GameBucket
      PolicyDocument:
        Statement:
          - Sid: PublicReadGetObject
            Effect: Allow
            Principal: '*'
            Action: s3:GetObject
            Resource: !Sub '${GameBucket.Arn}/*'

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        DefaultRootObject: index.html
        Origins:
          - Id: S3Origin
            DomainName: !GetAtt GameBucket.DomainName
            S3OriginConfig:
              OriginAccessIdentity: ''
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          AllowedMethods:
            - GET
            - HEAD
            - OPTIONS
          CachedMethods:
            - GET
            - HEAD
          Compress: true
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
        CustomErrorResponses:
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: /index.html
          - ErrorCode: 403
            ResponseCode: 200
            ResponsePagePath: /index.html

Outputs:
  BucketName:
    Value: !Ref GameBucket
    Description: S3 Bucket Name

  CloudFrontURL:
    Value: !GetAtt CloudFrontDistribution.DomainName
    Description: CloudFront Distribution URL

  WebsiteURL:
    Value: !Sub 'https://${CloudFrontDistribution.DomainName}'
    Description: Game URL
```

Deploy with:

```bash
aws cloudformation create-stack \
  --stack-name aws-network-game \
  --template-body file://cloudformation.yaml
```

### Step 5: Configure Custom Domain (Optional)

If you have a domain in Route 53:

1. Request an SSL certificate in ACM (us-east-1 region for CloudFront)
2. Add an alternate domain name to CloudFront distribution
3. Create a Route 53 A record (alias) pointing to CloudFront

## Alternative Deployment Options

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/aws-network-game"
}
```

3. Deploy:
```bash
npm run deploy
```

## Continuous Deployment

### GitHub Actions for S3

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1

    - name: Deploy to S3
      run: |
        aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }}/ --delete

    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation \
          --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
          --paths "/*"
```

Add these secrets to your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Cost Estimation

### S3 + CloudFront

For a typical educational game with moderate traffic:

- **S3 Storage**: $0.023 per GB/month (~$0.10/month for 5GB)
- **CloudFront Data Transfer**: First 1TB free tier, then $0.085/GB
- **CloudFront Requests**: First 10M free, then $0.0075 per 10,000 requests
- **Route 53** (if using custom domain): $0.50/month per hosted zone

**Estimated monthly cost for < 10,000 users**: $1-5/month

### Free Tier Options

- Netlify: 100GB bandwidth/month free
- Vercel: Unlimited bandwidth for non-commercial projects
- GitHub Pages: Free for public repositories

## Performance Optimization

### Build Optimizations

Already configured in `vite.config.ts`:
- Code splitting
- Minification
- Source maps for debugging

### CDN Best Practices

1. **Enable Compression**: CloudFront automatically gzips content
2. **Cache Headers**: Set appropriate `Cache-Control` headers
3. **Image Optimization**: Consider converting PNGs to WebP
4. **Lazy Loading**: Split code by route/component

### Monitoring

Use CloudWatch to monitor:
- CloudFront cache hit ratio
- S3 request metrics
- Data transfer costs

## Security Considerations

1. **HTTPS Only**: Always redirect HTTP to HTTPS
2. **CORS**: Configure if you plan to load resources from other domains
3. **Content Security Policy**: Add CSP headers in CloudFront
4. **Access Logs**: Enable S3 and CloudFront access logging

Example CSP header:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

## Troubleshooting

### Issue: 403 Forbidden on S3

**Solution**: Check bucket policy allows public read access

### Issue: CloudFront serves old content

**Solution**: Create invalidation
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Issue: SPA routing doesn't work

**Solution**: Configure CloudFront custom error responses to return index.html for 404s

### Issue: High costs

**Solution**:
- Review CloudFront cache hit ratio
- Set longer cache times
- Enable compression
- Consider using S3 Transfer Acceleration for uploads only

## Rollback

To rollback a deployment:

```bash
# List versions
aws s3api list-object-versions --bucket $BUCKET_NAME

# Restore specific version
aws s3api copy-object \
  --copy-source $BUCKET_NAME/index.html?versionId=VERSION_ID \
  --bucket $BUCKET_NAME \
  --key index.html
```

---

Choose the deployment method that best fits your needs. S3 + CloudFront is recommended for production use due to reliability, performance, and cost-effectiveness.
