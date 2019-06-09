// from https://stackoverflow.com/questions/28751268/create-circle-coordinates-given-central-lat-long-and-radius
const EARTH_RADIUS_NM = 3437.670013352;

const convertToRadians = angle => {
  return (angle * Math.PI) / 180;
};

const convertToAngles = radian => {
  return (radian * 180) / Math.PI;
};

export default (prevLat, prevLng, radius) => {
  const coords = [];

  const lat = convertToRadians(prevLat);
  const lng = convertToRadians(prevLng);

  const d = radius / EARTH_RADIUS_NM;

  for (let x = 0; x <= 360; x += 1) {
    const brng = convertToRadians(x);
    const latRadians = Math.asin(
      Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng)
    );
    const lngRadians =
      lng +
      Math.atan2(
        Math.sin(brng) * Math.sin(d) * Math.cos(lat),
        Math.cos(d) - Math.sin(lat) * Math.sin(latRadians)
      );

    coords.push([convertToAngles(latRadians), convertToAngles(lngRadians)]);
  }

  return coords;
};
