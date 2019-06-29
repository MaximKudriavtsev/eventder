const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const s3PublicUrl = `https://s3.eu-central-1.amazonaws.com/${
  process.env.BUCKET
}/`;

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
  const dynamoDBParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      display_url: `${s3PublicUrl}${id}.jpg`,
      preview_url: `${s3PublicUrl}${id}.jpg`,
      owner_id: event.queryStringParameters.ownerId,
      taken_at_timestamp: timestamp,
      location: {
        lat: event.queryStringParameters.lat,
        lng: event.queryStringParameters.lng,
        name: 'location-name',
        instagramId: 'instagram-id'
      }
    }
  };

  s3.putObject(s3Params, error => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: "Couldn't create the image item s3." })
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        display_url: `${s3PublicUrl}${fileKey}`,
        item: dynamoDBParams.Item
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    dynamoDb.put(dynamoDBParams, errorDB => {
      if (errorDB) {
        console.error(errorDB);
        callback(null, {
          statusCode: errorDB.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't create the file item dynamoDB."
        });
        return;
      }
      callback(null, response);
    });
  });
};

module.exports.addLike = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  // fetch record from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Couldn't fetch the record item."
      });
      return;
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id
      },
      ExpressionAttributeValues: {
        ':l': (result.Item.liked || 0) + 1
      },
      UpdateExpression: 'SET liked=:l',
      ReturnValues: 'ALL_NEW'
    };

    // update the record in the database
    dynamoDb.update(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: "Couldn't fetch the record item."
        });
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      callback(null, response);
    });
  });
};
