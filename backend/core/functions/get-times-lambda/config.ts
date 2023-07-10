import { getCdkHandlerPath } from '@swarmion/serverless-helpers';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { AclRestApi } from '@backend-core-rest-api/config';

export class GetTimesLambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: { api: AclRestApi }) {
    const lambdaRole = new Role(scope, `${id}-lambda-role`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      description: 'Role for ACL Lambda',
    });

    lambdaRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AWSLambdaBasicExecutionRole',
      ),
    );

    super(scope, id, {
      functionName: 'get-times-lambda',
      entry: getCdkHandlerPath(__dirname),
      handler: 'main',
    });

    const getTimes = props.api.root.addResource('getTimes');
    getTimes.addMethod('GET', new LambdaIntegration(this));
  }
}
