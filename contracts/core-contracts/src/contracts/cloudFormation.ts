import { CloudFormationContract } from '@swarmion/serverless-contracts';

import { projectName } from '@acl-app/serverless-configuration';

export const httpApiResourceContract = new CloudFormationContract({
  id: 'core-httpApi',
  name: `CoreHttpApi-${projectName}`,
});
