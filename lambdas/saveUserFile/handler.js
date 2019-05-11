const uuid = require('uuid');
const AWS = require('aws-sdk');

// const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const s3PublicUrl = 'https://s3.eu-central-1.amazonaws.com/eventder/';

module.exports.save = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const id = uuid.v1();

  const buffer = new Buffer(event.body, 'base64');
  const fileType = 'jpg';
  const fileKey = `${id}.${fileType}`;

  const s3Params = {
    Bucket: process.env.BUCKET,
    Key: fileKey,
    Body: buffer
  };
  // const dynamoDBParams = {
  //   TableName: process.env.DYNAMODB_TABLE,
  //   Item: {
  //     id,
  //     display_url: `${s3PublicUrl}${id}.jpg`,
  //     preview_url: `${s3PublicUrl}${id}.jpg`,
  //     owner_id: 'owner-id',
  //     taken_at_timestamp: timestamp,
  //     location: {
  //       lat: fields.lat,
  //       lng: fields.lng,
  //       name: 'location-name',
  //       instagramId: 'instagram-id'
  //     }
  //   }
  // };

  s3.putObject(s3Params, error => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: "Couldn't create the image item s3." })
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({ display_url: `${s3PublicUrl}${fileKey}` }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    };
    callback(null, response);
  });

  // dynamoDb.put(dynamoDBParams, error => {
  //   if (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: { 'Content-Type': 'text/plain' },
  //       body: "Couldn't create the file item dynamoDB."
  //     });
  //     return;
  //   }

  //   // create a response
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(dynamoDBParams.Item)
  //   };
  //   callback(null, response);
  // });
};
