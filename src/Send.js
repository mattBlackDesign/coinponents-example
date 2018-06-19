import React from 'react';
import PropTypes from 'prop-types';
import './web-components/Send';

export const Send = props => (
  <crypto-send {...props}>
    {props.children}
  </crypto-send>
);

Send.propTypes = {
  cryptocurrency: PropTypes.string,
  options: PropTypes.bool
};

export default Send;
