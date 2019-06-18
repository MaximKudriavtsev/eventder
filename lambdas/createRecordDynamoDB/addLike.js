const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: data.id
    }
  };

  // fetch record from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the record item."
      });
      return;
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: data.id
      },
      ExpressionAttributeValues: {
        ':l': (result.like || 0) + 1
      },
      UpdateExpression: 'SET like=:l',
      ReturnValues: 'ALL_NEW'
    };

    // update the record in the database
    dynamoDb.update(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't fetch the record item."
        });
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Attributes)
      };
      callback(null, response);
    });
  });
};
