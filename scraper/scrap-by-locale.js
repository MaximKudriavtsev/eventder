const { execSync } = require("child_process");

// To save with location data =>    --include-location
// To save into folder =>      --destination <folder_name>

module.exports = async (login, password, location) => {
  console.log("");
  console.log(`Start downloading photos data from ${location.name}`);

  execSync(
    `instagram-scraper --location ${
      location.instagramId
    } --maximum 10 -u ${login} -p ${password} --media-metadata --media-types none --include-location --destination downloads`
  );
};


// for testing

// times
// 10  - 1.5 min
// 100 - 2.25 min
// 200 - 6.40 min

// const tulaRussia = '221674386';

// const script = async () => {
//   console.log("");
//   console.log(`Start downloading photos data from ...`);

  
//   execSync(
//     `instagram-scraper --location ${
//       tulaRussia
//     } --maximum 5 -u max.kudryavtsev.dev -p FS2XsnWVP2QMm2B --media-metadata --media-types none --include-location --destination downloads`
//   );
// };

// // instagram-scraper --location 1210536975718297 --maximum 4 -u max.kudryavtsev.dev -p FS2XsnWVP2QMm2B --media-metadata --media-types none --include-location --destination downloads
// script();