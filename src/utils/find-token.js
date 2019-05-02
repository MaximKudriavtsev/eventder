export default (str, type) => {
  const startIndex = str.indexOf(type);
  const nextStr = str.slice(startIndex);
  return nextStr.slice(nextStr.indexOf('=') + 1, nextStr.indexOf('&'));
};
