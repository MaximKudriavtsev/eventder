const uuid = require('uuid');
const AWS = require('aws-sdk');
const ddbGeo = require('dynamodb-geo');

const dynamoDbGeo = new AWS.DynamoDB();
const dynamoDbData = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

// Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
const config = new ddbGeo.GeoDataManagerConfiguration(
  dynamoDbGeo,
  process.env.DYNAMODB_TABLE
);
// Instantiate the table manager
const ddbGeoTableManager = new ddbGeo.GeoDataManager(config);

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
    TableName: process.env.DYNAMODB_DATA_TABLE,
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

    ddbGeoTableManager
      .putPoint({
        RangeKeyValue: { S: id }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitude and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: event.queryStringParameters.lat,
          longitude: event.queryStringParameters.lng
        },
        PutItemInput: {
          Item: {
            id: { S: dynamoDBParams.Item.id }
          }
        }
      })
      .promise()
      .then(() => {
        dynamoDbData.put(dynamoDBParams, errorDB => {
          if (errorDB) {
            console.error(errorDB);
            callback(null, {
              statusCode: errorDB.statusCode || 501,
              headers: { 'Content-Type': 'text/plain' },
              body: "Couldn't create the file item dynamoDB."
            });
            return;
          }

          callback(null, {
            statusCode: 200,
            body: JSON.stringify(dynamoDBParams.Item),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        });
      });
  });
};

module.exports.addLike = (event, context, callback) => {
  const data = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const { userId, id } = data;

  const params = {
    TableName: process.env.DYNAMODB_DATA_TABLE,
    Key: { id }
  };

  dynamoDbData.get(params, (error, result) => {
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

    const dynamoDbParams = {
      TableName: process.env.DYNAMODB_DATA_TABLE,
      Key: { id },
      ExpressionAttributeValues: {
        ':l': uniqueUsers.length,
        ':u': uniqueUsers
      },
      UpdateExpression: 'SET liked=:l, liked_users=:u',
      ReturnValues: 'ALL_NEW'
    };

    dynamoDbData.update(dynamoDbParams, (err, updated) => {
      if (err) {
        console.error(err);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't fetch the record item."
        });
        return;
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(updated.Attributes)
      });
    });
  });
};

module.exports.removeLike = (event, context, callback) => {
  const data = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const { userId, id } = data;

  const params = {
    TableName: process.env.DYNAMODB_DATA_TABLE,
    Key: { id }
  };

  dynamoDbData.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the record item."
      });
      return;
    }

    const likedUsers = new Set(result.Item.liked_users || []);
    likedUsers.delete(userId);
    const uniqueUsers = [...likedUsers];

    const dynamoDbParams = {
      TableName: process.env.DYNAMODB_DATA_TABLE,
      Key: { id },
      ExpressionAttributeValues: {
        ':l': uniqueUsers.length,
        ':u': uniqueUsers
      },
      UpdateExpression: 'SET liked=:l, liked_users=:u',
      ReturnValues: 'ALL_NEW'
    };

    dynamoDbData.update(dynamoDbParams, (err, updated) => {
      if (err) {
        console.error(err);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: "Couldn't fetch the record item."
        });
        return;
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(updated.Attributes)
      });
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
