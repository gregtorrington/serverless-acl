import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  AnyPrincipal,
  Effect,
  PolicyDocument,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class AclRestApi extends RestApi {
  constructor(scope: Construct, id: string) {
    const policy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          principals: [new AnyPrincipal()],
          actions: ['execute-api:Invoke'],
          resources: ['execute-api:/*'],
          effect: Effect.ALLOW,
        }),
      ],
    });

    super(scope, id, {
      policy: policy,
      restApiName: 'ACL-API',
    });
  }
}
