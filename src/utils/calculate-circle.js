// const diametr = 1000; // meters
// const zoomValue = 14;
/* eslint-disable no-restricted-properties */

export default (radius, zoomValue, position) => {
  const metersPerPx =
    (156543.03392 * Math.cos((position[0] * Math.PI) / 180)) /
    Math.pow(2, zoomValue); // сколько метров в 1 px

  const diametrPx = (2 * radius) / metersPerPx;

  return diametrPx;
};
