const requestPromise = require('request-promise');

const RADIUS = 5000;
const SERVICE_ACCESS_KEY =
  'c30a3060c30a3060c30a3060d8c3607031cc30ac30a30609fceb79ec122235c06d15e84';
const TULA_LOCATION = {
  lat: 54.193037,
  long: 37.617031
};
const makeQueryString = ({ lat, long, radius, startTime, accessToken }) =>
  `https://api.vk.com/method/photos.search?lat=${lat}&long=${long}&radius=${radius}&start_time=${startTime}&access_token=${accessToken}&v=5.95`;

const makeDateInterval = () =>
  Math.floor(new Date().getTime() / 1000 - 1 * 60 * 60);

exports.handler = async () => {
  const queryString = makeQueryString({
    lat: TULA_LOCATION.lat,
    long: TULA_LOCATION.long,
    radius: RADIUS,
    startTime: makeDateInterval(),
    accessToken: SERVICE_ACCESS_KEY
  });

  const result1 = await requestPromise(queryString).then(response => {
    const result = JSON.parse(response).response;

    console.log(`Download ${result.count} vk posts`);

    const formatedItems = result.items.map(vkPost => {
      const lastSizeIndex = vkPost.sizes.length;
      return {
        id: vkPost.id,
        display_url: vkPost.sizes[lastSizeIndex - 1].url,
        preview_url: vkPost.sizes[0].url,
        owner_id: vkPost.owner_id,
        taken_at_timestamp: vkPost.date,
        location: {
          lat: vkPost.lat,
          lng: vkPost.long,
          name: '',
          instagramId: ''
        }
      };
    });

    return formatedItems;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result1),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};
