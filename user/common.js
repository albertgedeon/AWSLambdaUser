'use strict'

module.exports.responses = {
    generic: (data = {}, code = 0, headers = {}) => {
        return {
            'statusCode': code,
            'headers': headers,
            'body': JSON.stringify(data)
        };
    },
    success: (data = {}, code = 200, headers = {}) => {
        return {
            'statusCode': code,
            'headers': headers,
            'body': JSON.stringify(data)
        };
    },
    successNoJSONStringify: (data = {}, code = 200, headers = {}) => {
        return {
            'statusCode': code,
            'headers': headers,
            'body': data
        };
    },
    error: (error, headers = {}) => {
        return {
            'statusCode': error.code || 500,
            'headers': headers,
            'body': JSON.stringify(error)
        };
    }
},

module.exports.loggger = {
    logEvent: (event) => {
        return JSON.stringify({
            body: event.body,
            method: event.requestContext.httpMethod,
            stage: event.requestContext.stage,
            path: event.path,
            pathParameters: event.pathParameters,
            headers: event.headers
        });
    }
},

module.exports.errorJSON = {
    error: (message) => {
        return {
            'error': JSON.stringify(message)
        };
    }
};

