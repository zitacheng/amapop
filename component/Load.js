import React from 'react';
import {basic} from '../constant/basic';
import Spinner from 'react-native-loading-spinner-overlay';

export const Load = ({loading}) => {
  return (
    <Spinner
      visible={loading}
      textContent={'Loading...'}
      textStyle={basic.spinnerTextStyle}
    />
  );
};
