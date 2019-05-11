const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
  event.Records.forEach((record) => {
    const timestamp = new Date().getTime();
    const filename = record.s3.object.key;
    const filesize = record.s3.object.size;
    console.log(`New .png object has been created: ${filename} (${filesize} bytes)`);

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        lat: 0,
        lng: 0,
        display_url: filename,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the record item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    });
  });
};