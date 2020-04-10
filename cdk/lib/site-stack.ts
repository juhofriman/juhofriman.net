import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import cloudfront = require('@aws-cdk/aws-cloudfront');
import { RemovalPolicy, Duration } from '@aws-cdk/core';
import { ARecord, HostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';

export class SiteStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'site-origin-access-identity');

    const siteBucket = new s3.Bucket(this, 'juhofriman-dot-net-bucket', {
      bucketName: `personal-site-assets`,
      removalPolicy: RemovalPolicy.DESTROY
    });

    siteBucket.grantRead(originAccessIdentity)

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'juhofriman-dot-net-cloudfront', {
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket,
            originAccessIdentity
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              defaultTtl: Duration.seconds(120),
              minTtl: Duration.seconds(120),
              maxTtl: Duration.seconds(120),
            }
          ]
        }
      ],
      aliasConfiguration: {
        acmCertRef: 'arn:aws:acm:us-east-1:634214176572:certificate/d1b797ca-e079-46dc-a4e0-27896d396dbc',
        names: [
          'juhofriman.net'
        ]
      },
      httpVersion: cloudfront.HttpVersion.HTTP2,
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });

    // Route53 DNS record

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'hosted-zone-lookup', {
      hostedZoneId: 'Z2FO45Z4SCBA4N',
      zoneName: 'juhofriman.net'
    })

    new ARecord(this, 'documentation-site-a-record', {
      zone: hostedZone,
      recordName: 'juhofriman.net',
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    });

  }
}
