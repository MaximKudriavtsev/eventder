const { execSync } = require("child_process");
const scrapByLocale = require("./scrap-by-locale");
const { INSTAGRAM_LOGIN, INSTAGRAM_PASSWORD } = require("./keys");
const locations = require("./locations");

const script = async () => {
  const t0 = new Date();
  console.log("Start downloading locations metadata");

  locations.forEach(location => {
    scrapByLocale(INSTAGRAM_LOGIN, INSTAGRAM_PASSWORD, location);
  });

  console.log("Start aggregating data");

  execSync(`node combine-data.js`);

  const t1 = new Date();
  console.log(`Done! by ${(t1 - t0) / 1000 / 60} min`);
};

script();
