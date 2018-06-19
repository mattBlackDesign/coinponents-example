import { fetchConversionRate } from '../util/fetchConversionRate'

const uuidv1 = require('uuid/v1');

export class Balance extends HTMLElement {

	constructor() {
		super();

		this.uuid = uuidv1()

		this.fiat = ''
		this.crypto = ''
		this.fiatAmt = 0
		this.cryptoAmt = 0

		this.BTCTOSAT = 100000000

		this._innerHtml = this._innerHtml.bind(this)
	}

	connectedCallback() {
		let _this = this

		if (!this.hasAttribute('source'))
      this.setAttribute('source', 'metamask')
    this.source = this.getAttribute('source')
    if (!this.hasAttribute('crypto'))
      this.setAttribute('crypto', 'btc')
    this.crypto = this.getAttribute('crypto')
    if (!this.hasAttribute('fiat'))
      this.setAttribute('fiat', 'usd')
    this.fiat = this.getAttribute('fiat')

		document.dispatchEvent(new CustomEvent('getBalance', { detail: { crypto: this.crypto, source: this.source }}))

		document.addEventListener('gotBalance', function(e) {
			_this.cryptoAmt = e.detail.balance
			document.dispatchEvent(new CustomEvent('cryptoToFiat', { detail: { crypto: _this.crypto, balance: e.detail.balance }}))
		})

		document.addEventListener('gotCryptoToFiat', function(e) {
			_this.fiatAmt = e.detail.balance
			_this._innerHtml()
		})

		this._innerHtml()
	}

	_satToBtc (amt) {
		return parseInt(amt) / this.BTCTOSAT
	}

	_innerHtml() {
		this.innerHTML = `
			<div>
				<h2>
					<balance-element balance="${this.cryptoAmt}" unit="${this.crypto}"></balance-element>
				</h2>
				<p>
					<balance-element balance="${this.fiatAmt}" unit="${this.fiat}"></balance-element>
				</p>
				<button id="refresh" class="btn btn-primary">Refresh</button>
			</div>
		`
	}
}

customElements.define('x-balance', Balance);
