import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { GetListLambda } from '@backend-core-functions/get-list-lambda';
import { GetTimesLambda } from '@backend-core-functions/get-times-lambda';
import { AclRestApi } from '@backend-core-rest-api/config';

export class AclStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const api = new AclRestApi(this, 'AclRestApi');

    new GetListLambda(this, 'GetListLambda', {
      api,
    });

    new GetTimesLambda(this, 'GetTimesLambda', {
      api,
    });
  }
}
