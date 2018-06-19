import React from 'react';
import PropTypes from 'prop-types';
import './web-components/Balance';

export const Balance = props => (
	<x-balance {...props}>
		{props.children}
	</x-balance>
);

Balance.propTypes = {
	crypto: PropTypes.string,
	fiat: PropTypes.string,
  source: PropTypes.string
};

export default Balance;
