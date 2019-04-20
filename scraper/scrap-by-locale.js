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

// instagram-scraper --location 1210536975718297 --maximum 4 -u max.kudryavtsev.dev -p FS2XsnWVP2QMm2B --media-metadata --media-types none --include-location --destination downloads
