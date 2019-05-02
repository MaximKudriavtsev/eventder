import Cookie from 'js-cookie';

export default key => {
  const data = Cookie.get(key);
  return (data && JSON.parse(data)) || false;
};
