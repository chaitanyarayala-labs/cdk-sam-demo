#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkSamDemoStack } from '../lib/cdk-sam-demo-stack';

const app = new cdk.App();
new CdkSamDemoStack(app, 'CdkSamDemoStack');
