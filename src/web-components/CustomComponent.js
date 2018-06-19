import { fetchConversionRate } from '../util/fetchConversionRate'

const ChainAbstractionLayer = require('chainabstractionlayer/dist/bundle.js')

export class Balance extends HTMLElement {

	constructor() {
		super();

		this.balance = 0;
		this.units = '';
	}

	connectedCallback() {
		document.addEventListener('gotBalance', function(e) {
			this.balance = e.detail.balance;
			this.units = e.detail.units.toUpperCase();
		})
	}
}

customElements.define('custom-component', Balance);
