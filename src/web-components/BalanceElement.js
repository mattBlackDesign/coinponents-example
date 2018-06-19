export class BalanceElement extends HTMLElement {

	constructor() {
		super();

		this.unit = this.getAttribute('unit');
		this.balance = this.getAttribute('balance');
	}

	connectedCallback() {
		this.innerHTML = `
			<span>${this.balance}</span><span>${this.unit}</span>
		`
	}
}

customElements.define('balance-element', BalanceElement);
