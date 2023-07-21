import { App } from 'aws-cdk-lib';

import { AclStack } from './stack';

const app = new App();

new AclStack(app, 'acl-core');
