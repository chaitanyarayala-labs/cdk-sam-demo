import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class CdkSamDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'SamTests', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'SamTest'
    });

    const hello = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: 'index.lambda_handler',
      code: lambda.Code.asset('lambda_function')
    });

    const api = new apigateway.RestApi(this, 'sam-test-api', {
      restApiName: 'Sam Test'
    });

    const items = api.root.addResource('sams');
    const healthCheckIntegration = new apigateway.LambdaIntegration(hello);
    items.addMethod('GET', healthCheckIntegration);
  }
}
