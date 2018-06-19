import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

// import vdom from 'react-vdom';
// import Tabs from "./Tabs";
// import Tab from "./Tab";
import './web-components/Tab';
import './web-components/Tabs';
import './web-components/Balance';
import './web-components/BalanceElement';
import './web-components/BalanceController';
import './web-components/Send';
import './web-components/SendController';

const ChainAbstractionLayer = require('chainabstractionlayer/dist/bundle.js')

function makeWebComponentExample(root) {
	const el = document.createElement('div');
	el.innerHTML = `
		<x-balance crypto="eth" fiat="usd" source="metamask"></x-balance>
	`;
	root.appendChild(el);
}

function makeReactExample(root) {
	const app = <App/>;

	const el = document.createElement('div');

	root.appendChild(el);
	ReactDOM.render(app, el);
}

const webComponentsRoot = document.getElementById('web-components-root');
const reactRoot = document.getElementById('react-root');
makeWebComponentExample(webComponentsRoot);
makeReactExample(reactRoot);
