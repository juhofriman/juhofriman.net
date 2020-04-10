import cdk = require('@aws-cdk/core');
import iam = require('@aws-cdk/aws-iam');

export class DeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new iam.User(this, 'github-user', {
      userName: 'github-cicd-for-site',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRoute53FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonCloudfrontFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
      ]
    });
  }
}
