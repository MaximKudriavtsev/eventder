const fs = require('fs');
const requestPromise = require('request-promise');
const { TULA_LOCATION, SERVICE_ACCESS_KEY } = require('./keys');

const makeQueryString = ({ lat, long, radius, startTime, accessToken }) =>
  `https://api.vk.com/method/photos.search?lat=${lat}&long=${long}&radius=${radius}&start_time=${startTime}&access_token=${accessToken}&v=5.95`;

const makeDateInterval = () =>
  Math.floor(new Date().getTime() / 1000 - 1 * 60 * 60);

const RADIUS = 5000;

const queryString = makeQueryString({
  lat: TULA_LOCATION.lat,
  long: TULA_LOCATION.long,
  radius: RADIUS,
  startTime: makeDateInterval(),
  accessToken: SERVICE_ACCESS_KEY
});

console.log(queryString);

requestPromise(queryString).then(response => {
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

  fs.writeFileSync(
    'scraper-vk/result.json',
    JSON.stringify(formatedItems),
    'utf-8'
  );
});

// const METHOD_NAME = 'photos.search';
// const BASE_URL = 'https://api.vk.com/method/';
// const SECURE_KEY = 'FJauDVsCAmnxKezmbKPr';

// const makeQueryString = (methodName, parameters, accessToken) =>
//   `https://api.vk.com/method/${methodName}?${parameters}&access_token=${accessToken}&v=5.95`;

// Dubai = lat=25.151939&long=55.321418

// Tula = lat=54.193037&long=37.617031

// string for fetch
// https://api.vk.com/method/photos.search?lat=54.193037&long=37.617031&radius=5000&start_time=1556236800&access_token=c30a3060c30a3060c30a3060d8c3607031cc30ac30a30609fceb79ec122235c06d15e84&v=5.95
