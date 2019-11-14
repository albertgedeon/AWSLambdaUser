# Simple User API with Node and AWS Lambda

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- user - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- user/tests - Unit tests for the application code. 
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Deploy Application to AWS Lambda
```bash
aws s3 mb s3://BUCKET_NAME
sam build 
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket BUCKET_NAME
sam deploy \
    --template-file packaged.yaml \
    --stack-name user \
    --capabilities CAPABILITY_IAM
```

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
user$ sam build
```

The SAM CLI installs dependencies defined in `user/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
user$ sam local invoke putItemFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
user$ sam local start-api
user$ curl http://localhost:3000/
```