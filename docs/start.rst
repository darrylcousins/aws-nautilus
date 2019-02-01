Generating this project with AWS tools
======================================

Creating and updating the schema. From the `AppSync Console`_ the schema can be
built for the application which will also then generate the DynamoDB_ tables
necessary to store the data.

Codegen
=======

Tools are also provided to generate project code for the client application.
The simple steps to get started are::

   npm install -g @aws-amplify/cli
   amplify init
   amplify add codegen --apiId 4mzaxzujzje6bmfzc4e7nfiwtm
   amplify codegen

The files `src/aws-exports.js` and `src/graphql/*.js` have been created.

After any updates to the API's schema then the client code can be regenerated
with that final command::

   amplify codegen

.. _`AppSync Console`: http://console.amazon.com/appsync
.. _DynamoDB: http://aws.amazon.com/dynamodb
