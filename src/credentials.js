const SITE_URL = 'https://myjoinmap.com';

export const COGNITO_APP_URL = 'eventder.auth.eu-central-1.amazoncognito.com';
export const COGNITO_CLIENT_ID = '2cebga41r6o40otl3jpnurnef0';
export const REDIRECT_URL = process.env.PROD
  ? SITE_URL
  : 'http://localhost:3000/';
export const APP_NAME = 'My Join Map';
