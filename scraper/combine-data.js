const fs = require("fs");
const path = require("path");
const locations = require("./locations");

const resultDataFileName = "result.json";
const dataFolderName = "downloads";
const directoryPath = path.join(__dirname, dataFolderName);

const overrideFileIfChanged = (filename, data) => {
  let existingData;
  if (fs.existsSync(filename)) {
    existingData = fs.readFileSync(filename, "utf-8");
  }
  if (existingData !== data) {
    fs.writeFileSync(filename, data, "utf-8");
  }
};

fs.readdir(directoryPath, (err, fileNames) => {
  if (err) {
    return console.log(`Unable to scan directory: ${err}`);
  }
  const resultData = fileNames.reduce((data, fileName) => {
    const currentLocationData = locations.find(
      location => location.instagramId == fileName.slice(0, -5)
    );
    const filePath = path.join(__dirname, dataFolderName, fileName);
    const currentData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const finalData = currentData.GraphImages.map(instagramPost => ({
      id: instagramPost.id,
      display_url: instagramPost.display_url,
      preview_url: instagramPost.thumbnail_resources[0].src,
      owner_id: instagramPost.owner.id,
      taken_at_timestamp: instagramPost.taken_at_timestamp,
      location: {
        lat: currentLocationData.lat,
        lng: currentLocationData.lng,
        name: instagramPost.location.name,
        instagramId: currentLocationData.instagramId
      }
    }));

    return [...data, ...finalData];
  }, []);

  console.log(resultData);

  overrideFileIfChanged(resultDataFileName, JSON.stringify(resultData));
  return 0;
});
