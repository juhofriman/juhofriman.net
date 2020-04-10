#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { DeploymentStack } from '../lib/deployment-stack';
import { SiteStack } from '../lib/site-stack';

const app = new cdk.App();
new DeploymentStack(app, 'deployment-stack');
new SiteStack(app, 'site-stack');
