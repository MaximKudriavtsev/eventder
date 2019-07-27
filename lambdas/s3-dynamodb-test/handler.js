const uuid = require('uuid');
const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

const dynamoDb = new AWS.DynamoDB(); // AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3();

// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
const config = new ddbGeo.GeoDataManagerConfiguration(
  dynamoDb,
  process.env.DYNAMODB_TABLE
);
// Instantiate the table manager
const ddbGeoTableManager = new ddbGeo.GeoDataManager(config);

const s3PublicUrl = `https://s3.eu-central-1.amazonaws.com/${
  process.env.BUCKET
}/`;

module.exports.save = (event, context, callback) => {
  const timestamp = new Date().getTime().toString();
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

    ddbGeoTableManager
      .putPoint({
        RangeKeyValue: { S: id }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitude and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: event.queryStringParameters.lat,
          longitude: event.queryStringParameters.lng
        },
        PutItemInput: {
          // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
          Item: {
            id: { S: dynamoDBParams.Item.id },
            display_url: { S: dynamoDBParams.Item.display_url },
            preview_url: { S: dynamoDBParams.Item.preview_url },
            owner_id: { S: dynamoDBParams.Item.owner_id },
            taken_at_timestamp: { N: timestamp.toString() },
            liked: { N: '0' },
            liked_users: { L: [] },
            location: {
              M: {
                lat: { N: dynamoDBParams.Item.location.lat },
                lng: { N: dynamoDBParams.Item.location.lng },
                name: { S: dynamoDBParams.Item.location.name },
                instagramId: { S: dynamoDBParams.Item.location.instagramId }
              }
            }
          }
        }
      })
      .promise()
      .then(() => {
        callback(null, response);
      });
  });
};

module.exports.addLike = (event, context, callback) => {
  const data = JSON.parse(Buffer.from(event.body, 'base64').toString());
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
    const likedUsers = result.Item.liked_users || [];
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
      UpdateExpression: 'SET liked=:l, liked_users=:u',
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

module.exports.removeLike = (event, context, callback) => {
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

    const likeCount = result.Item.liked;

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id
      },
      ExpressionAttributeValues: {
        ':l': likeCount > 0 ? likeCount - 1 : 0
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

// should be used for get records
module.exports.getRecords = (event, context, callback) => {
  const { lat, lng, radius, startTime } = event.queryStringParameters;

  const response = res => ({
    statusCode: 200,
    body: JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

  ddbGeoTableManager
    .queryRadius({
      RadiusInMeter: Number(radius),
      CenterPoint: {
        latitude: Number(lat),
        longitude: Number(lng)
      }
    })
    .then(res => {
      callback(null, response(res));
    });
};
