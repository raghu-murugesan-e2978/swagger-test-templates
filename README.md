# Swagger Test Templates

| Linux | Windows |
| ----- | ------- |
| [![Build Status](https://travis-ci.org/apigee-127/swagger-test-templates.svg?branch=master)](https://travis-ci.org/apigee-127/swagger-test-templates) | [![Build Status](https://ci.appveyor.com/api/projects/status/github/apigee-127/swagger-test-templates?svg=true&branch=master)](https://ci.appveyor.com/project/noahdietz/swagger-test-templates) |

> Generate test code from a [Swagger](http://swagger.io) spec(version 2.0)

## Usage

Install via npm

```bash
npm install --save swagger-test-templates
```

Use your [Swagger](http://swagger.io) API spec file to generate test for your API.

```javascript
var stt = require('swagger-test-templates');
var swagger = require('/path/to/swagger.json');
var config = {
  assertionFormat: 'should',
  testModule: 'supertest',
  pathName: ['/user', '/user/{id}'],
  loadTest: [{pathName:'/user', operation:'get', load:{requests: 1000, concurrent: 100}}, { /* ... */ }],
  maxLen: 80,
  pathParams: {
    "id": "0123"
  }
};

// Generates an array of objects containing the test file content, following specified configuration
// the array contains objects with the scheme { name: <test-file-name>, test: <test-file-content> }
// tests = [ {name: base-path-test.js, test: ... }, {name: users-test.js, test: ... }]
var tests = stt.testGen(swagger, config);
```

## API

`swagger-test-templates` module exports a function with following arguments and return values:

### Arguments

* **`assertionFormat`** *required*: One of `should`, `expect` or `assert`. Choose which assertion method should be used in output test code.
* **`testModule`** *required*: One of `supertest` or `request`. Choose between direct API calls (`request`) vs. programatic access to your API (`supertest`).
* **`pathName`** *required*: List of path names available in your Swagger API spec used to generate tests for. Empty array leads to **all paths**.
* **`statusCodes`** *optional* Array with status codes to generate tests for. Useful for generating only happy-flow tests. Excluding this param will generate tests for all responses.
* **`loadTest`** *optional*: List of objects info in your Swagger API spec used to generate stress tests. If specify, pathName & operation are **required**. Optional fields requests defaults to `1000`, concurrent defaults to `100`.
* **`maxLen`** *optional*: Maximum line length. If set to `-1`, descriptions will not be truncated. Defaults to `80`.
* **`pathParams`** *optional*: Object containing the values of a specific path parameters.
* **`templatesPath`** *optional* String indicating a custom handlebars-template path for generating the tests. Note: copy all the templates to your custom directory, this is a 'all-or-nothing' path
* **`requestData`** *optional* Object containing data to send with the request See section on requestData for more details

### Return value

An array in which each string is content of a test file and the file name. Use this information to write those files to disk.

## Sending requestData

Based on your schema there are a few modules out there that allow you to generate mock request payloads.
You can send this mock data along with the tests generated by this module by filling the `requestData` property of the module.
The mock data needs to have the following structure:

### Mock HTTP request body

```javascript
{
   '/endpoint': {
       operation: {
           'responseCode': [{ body: {}, description:'some description of the data']
       }
   }
 }

```

### Mock Path Parameters

```javascript
{
   '/pet/{name}': {
       get: {
           '200': [{ name: 'spot', description:'some description of the data']
       }
   }
 }

```

### Mock Query Parameters

This will make a request to `/pet?name=spot` assuming that your swagger API has a definition for a `name` query parameter.

```javascript
{
   '/pet': {
       get: {
           '200': [{ name: 'spot', description:'some description of the data']
       }
   }
 }

```

### Mock HTTP Headers

This will add an HTTP header `X-Token` set to `waestrydtufj` assuming that your swagger API has a definition for that header.

```javascript
{
   '/pet': {
       get: {
           '200': [{ 'X-Token': 'waestrydtufj', description:'some description of the data']
       }
   }
 }

```

so, for example this could be:

```javascript
{
     '/pet': {
         post: {
             '200': [{
               body: {
                  id: 1,
                  otherProperty: 'some property that is a string'
                 },
                 description: 'the description for this data'
               }]
         },
         get: {
            '200': [ {
              guid: 'some_string_to_place_in_path',
              anotherPathParam: 100,
              description: 'valid path or query parameters'
            }]
         }
     }
 }
```

Note: for get-requests matching data will be transferred to the pathParams. So setting config.pathParams directly will have the same effect (see above).

Every mockData item in the `responseCode` array will be used to generate a test. The description will be added to the "it" function for reference.

## License

[MIT](/LICENSE)
