const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const { userId, id } = data;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id
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

    const likedUsers = result.liked_users || [];
    likedUsers.push(userId);
    const uniqueUsers = [...new Set(likedUsers)];

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: data.id
      },
      ExpressionAttributeValues: {
        ':l': uniqueUsers.length,
        ':u': uniqueUsers
      },
      UpdateExpression: 'SET like=:l, liked_users=:u',
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
