import * as React from 'react';
import InitialPage from '../components/initial-page';
import Auth from '../components/utils/auth';

/* eslint-disable react/prop-types */
export default props => {
  return (
    <React.Fragment>
      <Auth {...props} />
      <InitialPage />
    </React.Fragment>
  );
};
