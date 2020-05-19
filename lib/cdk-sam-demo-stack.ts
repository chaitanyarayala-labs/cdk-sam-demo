import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { CfnParameter } from '@aws-cdk/core';
import { Code } from '@aws-cdk/aws-lambda';


export class CdkSamDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'SamTests', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'SamTest',
      readCapacity: 6,
      writeCapacity: 6
    });

    const newTable = new dynamodb.Table(this, 'NewSamTest', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'NewSamTest-1'
    });

    // const table2 = dynamodb.Table.fromTableArn(this, 'NewSamTest', table.tableArn)

    // const bucketNameParam = new cdk.CfnParameter(this, "LambdaSourceBucketName");
    // bucketNameParam.overrideLogicalId("LambdaSourceBucketName");

    // const objectKeyParam = new cdk.CfnParameter(this, "LambdaSourceObjectKey");
    // objectKeyParam.overrideLogicalId("LambdaSourceObjectKey");

    // const hello = new lambda.Function(this, 'MyFunction', {
    //   runtime: lambda.Runtime.PYTHON_3_7,
    //   handler: 'index.lambda_handler',
    //   code: lambda.Code.fromCfnParameters({
    //     bucketNameParam,
    //     objectKeyParam
    //   })
    // });

    // const health = new lambda.Function(this, 'Table Exist', {
    //   runtime: lambda.Runtime.PYTHON_3_7,
    //   handler: 'table_exist.health_check',
    //   code: lambda.Code.fromCfnParameters({
    //     bucketNameParam: new CfnParameter(this, 'lambda2'),
    //     objectKeyParam: new CfnParameter(this, 'key2')
    //   }),
    //   environment: {
    //     'TABLE_NAME': 'NewSamTest',
    //     'ENV': 'local'
    //   }
    // });
    const createItem = new lambda.Function(this, 'Create Item', {
      functionName: 'yimeng-fun-1',
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: 'sam_test.create_handler',
      code: lambda.Code.asset('lambda_function')
    });

    // const api = new apigateway.RestApi(this, 'sam-test-api', {
    //   restApiName: 'Sam Test'
    // });

    // const sam = api.root.addResource('sam');
    // const samIntegration = new apigateway.LambdaIntegration(hello);
    // sam.addMethod('GET', samIntegration);

    // table.grantFullAccess(health);
    table.grantWriteData(createItem);
  }
}
