const uuid = require('uuid');
// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const s3PublicUrl = 'https://s3.eu-central-1.amazonaws.com/eventder/';

module.exports.save = (event, context, callback) => {
  const timestamp = new Date().getTime();
  // const data = JSON.parse(event.body);
  // if (typeof data.text !== 'string') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the todo item.',
  //   });
  //   return;
  // }

  const id = uuid.v1();

  const dynamoDBParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      display_url: `${s3PublicUrl}${id}.jpg`,
      preview_url: `${s3PublicUrl}${id}.jpg`,
      owner_id: 'owner-id',
      taken_at_timestamp: timestamp,
      location: {
        lat: event.lat,
        lng: event.lng,
        name: 'location-name',
        instagramId: 'instagram-id'
      }
    }
  };

  const s3Params = {
    Bucket: process.env.BUCKET,
    Key: id,
    Body: event.file
  };

  s3.putObject(s3Params);

  // write the todo to the database
  dynamoDb.put(dynamoDBParams, error => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the file item."
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(dynamoDBParams.Item)
    };
    callback(null, response);
  });
};
