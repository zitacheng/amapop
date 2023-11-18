import React from 'react';
import {basic} from '../constant/basic';
import Spinner from 'react-native-loading-spinner-overlay';
// import {translate} from '../constant/config.js';

export const Load = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={basic.spinnerTextStyle}
    />
  );
};
